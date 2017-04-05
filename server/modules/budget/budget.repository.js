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

  }

}
