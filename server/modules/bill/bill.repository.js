const mongoose = require('mongoose');
const model = require('./bill.model');
let Bill = mongoose.model('Bill');
let repositoryHelper = require('../../helper/repository.helper')(Bill);

module.exports = {

  getBills: () => {
    return repositoryHelper.getAll({}, null, null, null, (query) => {
      query.populate('category');
      query.populate('account');      
    });
  },

  add: (documentToAdd) => {
    return new Promise(function(success) {

      let newDocument = new Bill(documentToAdd);

      newDocument.save(function(err) {
        if (err) return handleError(err);

        Bill.findById(newDocument._id)
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

      Bill.findById(id, (err, bill) => {

        if (err) return handleError(err);

        if (bill) {
          Bill.remove({_id: id}, function(err) {
            if (err) return handleError(err);

            success(bill);
          });
        } else {
          success({});
        }

      })

    });

  }

}
