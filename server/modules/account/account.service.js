const accountRepository = require('./account.repository');

module.exports = {

  getAccounts: function(req, res) {
    accountRepository.getAccounts().then(function(accounts) {
      res.end(JSON.stringify(accounts, null, 2));
    });
  },

}
