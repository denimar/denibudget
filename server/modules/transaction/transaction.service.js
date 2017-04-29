const transactionRepository = require('./transaction.repository');

module.exports = {

  getTransactions: (req, res) => {
    transactionRepository.getTransactions().then((transactions) => {
      res.end(JSON.stringify(transactions, null, 2));
    });
  },

  addTransaction: (req, res) => {
    transactionRepository.add(req.body).then((addedTransaction) => {
      res.end(JSON.stringify(addedTransaction, null, 2));
    });
  },

  updTransaction: (req, res) => {
    transactionRepository.upd(req.body).then((updatedTransaction) => {
      res.end(JSON.stringify(updatedTransaction, null, 2));
    });
  },

  delTransaction: (req, res) => {
    let id = req.params.id;

    transactionRepository.del(id).then((deletedTransaction) => {
      res.end(JSON.stringify(deletedTransaction, null, 2));
    });
  }

}
