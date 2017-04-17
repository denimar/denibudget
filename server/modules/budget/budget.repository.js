const mongoose = require('mongoose');
const model = require('./budget.model');
let Budget = mongoose.model('budget');
let repositoryHelper = require('../../helper/repository.helper')(Budget);

module.exports = {

  getBudgets: () => {
    return repositoryHelper.getAll({}, {startDate: -1}, null, null, (query) => {
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

}
