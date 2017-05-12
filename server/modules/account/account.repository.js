import moment from 'moment'
const mongoose = require('mongoose');
//mongoose.set('debug', true)
const model = require('./account.model');
let Account = mongoose.model('Account');
const transferModel = require('./transfer.model');
let repositoryHelper = require('../../helper/repository.helper')(Account);
let Transfer = mongoose.model('Transfer');
let repositoryTransfersHelper = require('../../helper/repository.helper')(Transfer);
let transactionRepository = require('../transaction/transaction.repository');
import routine from '../../../common/common.routine';

module.exports = {

  getAccounts: () => {
    return repositoryHelper.getAll({}, {name: 1});
  },

  add: (documentToAdd) => {
    return new Promise(function(success) {

      let newDocument = new Account(documentToAdd);

      newDocument.save(function(err) {
        if (err) return handleError(err);

        Account.findById(newDocument._id)
          .exec()
            .then(function(data) {
              success(data);
            });

      });

    });

  },

  upd: (documentToUpd) => {
    return new Promise(function(success) {

      let updDocument = new Account(documentToUpd);

      Account.findByIdAndUpdate(documentToUpd._id, documentToUpd, (err, updatedModel) => {
        if (err) return handleError(err);
        success(documentToUpd);
      });

    });

  },

  del: (id) => {
    return new Promise(function(success) {

      Account.findById(id, (err, account) => {

        if (err) return handleError(err);

        if (account) {
          Account.remove({_id: id}, function(err) {
            if (err) return handleError(err);

            success(account);
          });
        } else {
          success({});
        }

      })

    });

  },

  getAccountBalance: (id) => {
    return _getAccountBalanceAtDate(id, routine.formatDate(new Date(), 'YYYY-MM-DD'));
  },

  getAccountBalanceAtDate: (id, date) => {
    return _getAccountBalanceAtDate(id, date);
  },

  getAccountStatement: (id, startDate, endDate) => {

    return new Promise(function(success) {

      Account.findById(id, (err, account) => {

        if (err) return handleError(err);

        if (account) {
          let statement = [];

          const momentStartDate = moment(startDate).startOf('day');
          const momentEndDate = moment(endDate).startOf('day');

          transactionRepository.getTransactionsByAccount(id, momentStartDate.toISOString(), momentEndDate.toISOString())
            .then((transactions) => {
              transactions.forEach(transaction => statement.push(transaction))
              _getTransfersByAccount(id)
                .then(transfers => {
                  transfers.forEach(transfer => {
                    const type = transfer.from._id.toString() === id ? 'D' : 'C';
                    const account = transfer.from._id.toString() === id ? transfer.to : transfer.from;
                    const description = transfer.from._id.toString() === id ? `Transferred to "${transfer.to.name}"` : `Transferred from "${transfer.from.name}"`;
                    statement.push({
                      description: description,
                      date: moment(transfer.date).format('YYYY-MM-DD'),
                      value: transfer.value,
                      account: account,
                      category: {
                        path: 'TRANSFERS'
                      },
                      type: type
                    });
                  })

                  success(statement);
                });
            })

        } else {
          success([]);
        }

      })


    });

  },

  getTransfers: (where) => {
    return _getTransfers(where);
  },

  getTransfersByAccount: (accountId) => {
    return _getTransfersByAccount(accountId);
  },

  addTransfer: (documentToAdd) => {
    return new Promise(function(success) {

      let newDocument = new Transfer(documentToAdd);

      newDocument.save(function(err) {
        if (err) return handleError(err);

        Transfer.findById(newDocument._id)
          .exec()
            .then(function(data) {
              success(data);
            });

      });

    });

  },

  delTransfer: (id) => {
    return new Promise(function(success) {

      Transfer.findById(id, (err, transfer) => {

        if (err) return handleError(err);

        if (transfer) {
          Transfer.remove({_id: id}, function(err) {
            if (err) return handleError(err);

            success(transfer);
          });
        } else {
          success({});
        }

      })

    });

  },
}

function _getTransfers(where) {
  const transferWhere = where || {};
  return repositoryTransfersHelper.getAll(transferWhere, {date: -1}, null, null, (query) => {
    query.populate('from');
    query.populate('to');
  });
}

function _getTransfersByAccount(accountId) {
  return _getTransfers({
    $or: [
      {
        from: accountId
      },
      {
        to: accountId
      }
    ]
  });
}

function _getAccountBalanceAtDate(id, date) {
  return new Promise(function(success) {

    Account.findById(id, (err, account) => {

      if (err) return handleError(err);

      if (account) {
        const openingBalance = account.openingBalance;
        let balance = openingBalance;

        transactionRepository.getTransactionsByAccount(account._id, new Date(0), date)
          .then((transactions) => {
            transactions.forEach(transaction => {
              if (transaction.type === 'C') {
                balance += transaction.value;
              } else {
                balance -= transaction.value;
              }
            })

            _getTransfersByAccount(id)
              .then(transfers => {
                transfers.forEach(transfer => {
                  if (transfer.from._id.toString() === id) {
                    balance -= transfer.value;
                  } else {
                    balance += transfer.value;
                  }
                });

                success(balance);
              });

          })

      } else {
        success(0);
      }

    })
  });
}
