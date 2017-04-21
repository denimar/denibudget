const mongoose = require('mongoose');
const model = require('./transaction.model');
let Transaction = mongoose.model('Transaction');
let repositoryHelper = require('../../helper/repository.helper')(Transaction);

module.exports = {

  getTransactions: () => {
    return repositoryHelper.getAll({}, null, null, null, (query) => {
      query.populate('category');
      query.populate('account');
    });
  },

  getTransactionsByAccount: (accountId) => {
    return repositoryHelper.getAll({
      account: mongoose.Types.ObjectId(accountId)
    });
  },

  add: (documentToAdd) => {
    return new Promise(function(success) {

      let newDocument = new Transaction(documentToAdd);

      newDocument.save(function(err) {
        if (err) return handleError(err);

        Transaction.findById(newDocument._id)
          .populate('category')
          .populate('account')
          .exec()
            .then(function(data) {
              success(data);
            });

      });

    });

  },

  del: (id) => {
    return new Promise(function(success) {

      Transaction.findById(id, (err, transaction) => {

        if (err) return handleError(err);

        if (transaction) {
          Transaction.remove({_id: id}, function(err) {
            if (err) return handleError(err);

            success(transaction);
          });
        } else {
          success({});
        }

      })

    });

  }

}
