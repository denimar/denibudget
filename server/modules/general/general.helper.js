import moment from 'moment'
const mongoose = require('mongoose');
//let transactionRepository = require('../transaction/transaction.repository');
let Transaction = mongoose.model('Transaction');
let repositoryHelper = require('../../helper/repository.helper')(Transaction);

module.exports = {

  getHowMuchMoneyIHadAtDate: (date, accounts, transactions) => {
    return new Promise(success => {
      let openingBalanceAccounts = 0;
      accounts.forEach(account => {
        let momentStartDate = moment(account.startDate);
        if (momentStartDate.isSameOrBefore(date)) {
          openingBalanceAccounts += account.openingBalance;
        }
      })
      let balance = openingBalanceAccounts;
      transactions.forEach(transaction => {
        if (transaction.date <= date && transaction.account.startDate <= date) {
          if (transaction.type === 'C') {
            balance += transaction.value;
          } else {
            balance -= transaction.value;
          }
        }
      });
      success(balance);

    });
  }

}
