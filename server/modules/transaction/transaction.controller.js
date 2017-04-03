const transactionService = require('./transaction.service');
const commonConstant = require('../../../common/common.constant');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {

  app.get(commonConstant.ENDPOINT.TRANSACTION, transactionService.getTransactions);
  app.post(commonConstant.ENDPOINT.TRANSACTION + '/add', jsonParser, transactionService.addTransaction);
  app.delete(commonConstant.ENDPOINT.TRANSACTION + '/del/:id', transactionService.delTransaction);

}
