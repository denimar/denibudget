import moment from 'moment'
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

  getTransactionsByAccount: (accountId, startDate, endDate) => {
    let where = {
      account: mongoose.Types.ObjectId(accountId)
    }
    if (startDate && endDate) {
      const momentStartDate = moment(startDate).startOf('day');
      const momentEndDate = moment(endDate).startOf('day');
      where.date = {
        $gte: momentStartDate.toISOString(),
        $lte: momentEndDate.toISOString(),
      };
    }
    return repositoryHelper.getAll(where, null, null, null, (query) => {
      query.populate('category');
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
