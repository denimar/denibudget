import moment from 'moment'
const mongoose = require('mongoose');
const model = require('./budget.model');
let Budget = mongoose.model('Budget');
let repositoryBudgetHelper = require('../../helper/repository.helper')(Budget);
let Transaction = mongoose.model('Transaction');
let repositoryTransactionHelper = require('../../helper/repository.helper')(Transaction);
let generalHelper = require('../general/general.helper');
let accountRepository = require('../account/account.repository');
let categoryRepository = require('../category/category.repository');

module.exports = {

  getBudgets: () => {
    return new Promise(function(success) {
      repositoryBudgetHelper.getAll({}, {startDate: -1}, null, null, (query) => {
        query.populate('details.category');
      }).then(budgets => {
        categoryRepository.getCategories()
          .then(categories => {
            _setCategoriesPath(budgets, categories.children);
            success(budgets)
          });
      });
    });
  },

  getBudgetById: (budgetId) => {
    return repositoryBudgetHelper.getAll({
      _id: budgetId
    }, {startDate: -1}, null, null, (query) => {
      query.populate('details.category');
    });
  },

  add: (documentToAdd) => {
    return new Promise(function(success) {

      let newDocument = new Budget(documentToAdd);

      newDocument.save(function(err) {
        if (err) return handleError(err);

        Budget.findById(newDocument._id)
          .populate('category')
          .exec()

            .then(function(data) {
              success(data);
            });

      });

    });

  },

  del: (id) => {
    return new Promise(function(success) {

      Budget.findById(id, (err, budget) => {

        if (err) return handleError(err);

        if (budget) {
          Budget.remove({_id: id}, function(err) {
            if (err) return handleError(err);

            success(budget);
          });
        } else {
          success({});
        }

      })

    });

  },

  upd: (budgetToUpd) => {
    let details = budgetToUpd.details || [];
    details.forEach(item => {
      if (!item._id) { //when id comes undefined means it is a new record
        item._id = mongoose.Types.ObjectId();
      }
    });

    return new Promise(function(success) {
      Budget.findByIdAndUpdate(budgetToUpd._id, budgetToUpd, (err, updatedModel) => {
        if (err) return handleError(err);
        success(budgetToUpd);
      });
    });

  },

  getHowMuchMoneyIHadAtTheEndOfTheBudget: (budget) => {
    return _getHowMuchMoneyIHadAtTheEndOfTheBudget(budget);
  },

  getHowMuchMoneyAtTheEnd: () => {
    let self = this;
    let budgetAndHowMuchMoneyArray = [];
    let budgetCount = 0;
    return new Promise(success => {
      repositoryBudgetHelper.getAll({}, {startDate: 1})
        .then(budgets => {
          budgets.forEach(budget => {
            accountRepository.getAccounts()
              .then(accounts => {
                repositoryTransactionHelper.getAll({}, {date: 1}, null, null, (query) => {
                  query.populate('account');
                }).then(transactions => {

                  _getHowMuchMoneyIHadAtTheEndOfTheBudget(budget, accounts, transactions)
                    .then(budgetAndHowMuchMoney => {
                      budgetAndHowMuchMoneyArray.push(budgetAndHowMuchMoney);

                      budgetCount++;
                      if (budgetCount === budgets.length) {
                        let sortedBudgetAndHowMuchMoneyArray = budgetAndHowMuchMoneyArray.sort((obj1, obj2) => {
                          if (obj1.sortField < obj2.sortField) return -1;
                          if (obj1.sortField > obj2.sortField) return 1;
                          return 0;
                        });

                        //remove sort field
                        sortedBudgetAndHowMuchMoneyArray.forEach(obj => {
                          delete obj['sortField'];
                        })
                        success(sortedBudgetAndHowMuchMoneyArray);
                      }
                    })

                });
              });
          })
        });
    });
  }

}

function _getHowMuchMoneyIHadAtTheEndOfTheBudget(budget, accounts, transactions) {
  return new Promise(success => {

    let momentEndDate = moment(budget.endDate).startOf('day');
    let today = new Date();
    if (momentEndDate.isAfter(today)) {
      momentEndDate = moment(today).startOf('day');
    }

    generalHelper.getHowMuchMoneyIHadAtDate(momentEndDate.toDate(), accounts, transactions)
      .then(howMuchMoney => {
        success({
          sortField: parseInt(momentEndDate.format('YYYYMMDD')),
          description: momentEndDate.format('MM/DD/YYYY'),
          value: howMuchMoney
        });
      })
  })
}

function _getBudgetById(id) {
  return repositoryBudgetHelper.getAll({
    _id: budgetId
  }, {startDate: -1}, null, null, (query) => {
    query.populate('details.category');
  });
}

function _getCategoryById(categories, categoryId) {
  for (let i = 0 ; i < categories.length ; i++) {
    const category = categories[i];
    if (category.id.toString() === categoryId) {
      return category;
    } else {
      if (category.children && category.children.length > 0) {
        const categoryFound = _getCategoryById(category.children, categoryId);
        if (categoryFound) {
          return categoryFound;
        }
      }
    }
  }
  return null;
}

function _setCategoriesPath(budgets, categories) {
  budgets.forEach(budget => {
    let budgetItems = budget.details || [];
    budgetItems.forEach(budgetItem => {
      if (budgetItem.category) {
        let cat = _getCategoryById(categories, budgetItem.category._id.toString());
        budgetItem.path = cat.path;
      }
    })
  })
}
