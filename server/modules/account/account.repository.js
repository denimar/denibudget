const mongoose = require('mongoose');
const model = require('./account.model');
let Account = mongoose.model('Account');
let repositoryHelper = require('../../helper/repository.helper')(Account);

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

  }

}
