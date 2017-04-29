const mongoose = require('mongoose');
//mongoose.set('debug', true)
const model = require('./account.model');
let Account = mongoose.model('Account');
let repositoryHelper = require('../../helper/repository.helper')(Account);
let transactionRepository = require('../transaction/transaction.repository');

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

    return new Promise(function(success) {

      Account.findById(id, (err, account) => {

        if (err) return handleError(err);

        if (account) {
          const openingBalance = account.openingBalance;
          let balance = openingBalance;

          transactionRepository.getTransactionsByAccount(account._id, account.startDate, account.endDate)
            .then((transactions) => {

              transactions.forEach(transaction => {
                if (transaction.type === 'C') {
                  balance += transaction.value;
                } else {
                  balance -= transaction.value;
                }
              })

              success(balance);

            })

        } else {
          success(0);
        }

      })


    });

  },

  getAccountStatement: (id, startDate, endDate) => {

    return new Promise(function(success) {

      Account.findById(id, (err, account) => {

        if (err) return handleError(err);

        if (account) {
          let statement = [];

          transactionRepository.getTransactionsByAccount(id, startDate, endDate)
            .then((transactions) => {

              transactions.forEach(transaction => {
                statement.push(transaction);
              })

              success(statement);

            })

        } else {
          success([]);
        }

      })


    });

  },

}
