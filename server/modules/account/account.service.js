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

  updAccount: (req, res) => {
    accountRepository.upd(req.body).then((updatedAccount) => {
      res.end(JSON.stringify(updatedAccount, null, 2));
    });
  },

  delAccount: (req, res) => {
    let id = req.params.id;

    accountRepository.del(id).then((deletedAccount) => {
      res.end(JSON.stringify(deletedAccount, null, 2));
    });
  },

  getAccountBalance: (req, res) => {
    let id = req.params.id;

    accountRepository.getAccountBalance(id).then((balance) => {
      let currentBalanceJson = {
        currentBalance: balance
      }
      res.end(JSON.stringify(currentBalanceJson, null, 2));
    });
  },

  getAccountBalanceAtDate: (req, res) => {
    let id = req.params.id;
    let date = req.params.date;

    accountRepository.getAccountBalanceAtDate(id, date).then((balance) => {
      let currentBalanceJson = {
        currentBalance: balance
      }
      res.end(JSON.stringify(currentBalanceJson, null, 2));
    });
  },

  getAccountStatement: (req, res) => {
    let id = req.params.id;
    let startDate = req.params.startdate;
    let endDate = req.params.enddate;

    accountRepository.getAccountStatement(id, startDate, endDate)
      .then((accountStatement) => {
        res.end(JSON.stringify(accountStatement, null, 2));
      });
  },

  getTransfers: (req, res) => {
    accountRepository.getTransfers()
      .then((transfers) => {
        res.end(JSON.stringify(transfers, null, 2));
      });
  },

  getTransfersByAccount: (req, res) => {
    let accountId = req.params.accountid;

    accountRepository.getTransfersByAccount(accountId)
      .then((transfers) => {
        res.end(JSON.stringify(transfers, null, 2));
      });
  },

  addTransfer: (req, res) => {
    accountRepository.addTransfer(req.body)
      .then((addedTransfer) => {
          res.end(JSON.stringify(addedTransfer, null, 2));
      });
  },

  delTransfer: (req, res) => {
    let id = req.params.id;

    accountRepository.delTransfer(id)
      .then((deletedTransfer) => {
        res.end(JSON.stringify(deletedTransfer, null, 2));
      });
  },

}
