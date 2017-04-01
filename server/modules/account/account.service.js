const accountRepository = require('./account.repository');

module.exports = {

  getAccounts: function(req, res) {
    accountRepository.getAccounts().then(function(accounts) {
      res.end(JSON.stringify(accounts, null, 2));
    });
  },

  addAccount: (req, res) => {
    accountRepository.add(req.body).then((addedAccount) => {
      res.end(JSON.stringify(addedAccount, null, 2));
    });
  },

  delAccount: (req, res) => {
    let id = req.params.id;

    accountRepository.del(id).then((deletedAccount) => {
      res.end(JSON.stringify(deletedAccount, null, 2));
    });
  }

}
