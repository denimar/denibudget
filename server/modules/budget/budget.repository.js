const mongoose = require('mongoose');
const model = require('./budget.model');
let Budget = mongoose.model('Budget');
let repositoryHelper = require('../../helper/repository.helper')(Budget);

module.exports = {

  getBudgets: repositoryHelper.getAll,

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

      let budgetDocument = new Budget(budget);
      if (!budgetDocument.details) {
        budgetDocument.details = [];
      }
      budgetDocument.details.push(budgetItemToAdd);

      budgetDocument.save(function(err) {
        if (err) return handleError(err);

        Budget.findById(budgetDocument._id)
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

  }

}
