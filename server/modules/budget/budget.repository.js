const mongoose = require('mongoose');
const model = require('./budget.model');
let Budget = mongoose.model('Budget');
let repositoryHelper = require('../../helper/repository.helper')(Budget);

module.exports = {

  getBudgets: () => {
    return repositoryHelper.getAll({}, {startDate: -1})
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

  addItem: (budget, budgetItemToAdd ) => {
    return new Promise(function(success) {

      if (!budget.details) {
        budget.details = [];
      }

      budget.details.push(budgetItemToAdd);

      Budget.findByIdAndUpdate(budget._id, budget, (err, updatedModel) => {
        if (err) return handleError(err);
        success(budget);
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

  delItem: (budget, budgetItemToDel) => {
    return new Promise(function(success) {

      const details = budget.details || [];
      for (let i = 0 ; i < details.length ; i++) {
        const budgetItem = details[i];
        if (budgetItem.category === budgetItemToDel.category && budgetItem.description === budgetItemToDel.description) {
          details.splice(i, 1);
          break;
        }
      }
      budget.details = details;

      Budget.findByIdAndUpdate(budget._id, budget, (err, updatedModel) => {
        if (err) return handleError(err);
        success(budget);
      });

    });

  },

  upd: (budgetToUpd) => {
    return new Promise(function(success) {
      Budget.findByIdAndUpdate(budgetToUpd._id, budgetToUpd, (err, updatedModel) => {
        if (err) return handleError(err);
        success(budgetToUpd);
      });
    });

  },

}
