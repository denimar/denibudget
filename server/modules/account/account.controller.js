const accountService = require('./account.service');
const commonConstant = require('../../../common/common.constant');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {

  app.get(commonConstant.ENDPOINT.ACCOUNT + '/balance/:id', accountService.getAccountBalance);
  app.get(commonConstant.ENDPOINT.ACCOUNT + '/balance/:id/:date', accountService.getAccountBalanceAtDate);
  app.get(commonConstant.ENDPOINT.ACCOUNT + '/statement/:id/:startdate/:enddate', accountService.getAccountStatement);
  app.get(commonConstant.ENDPOINT.ACCOUNT, accountService.getAccounts);
  app.post(commonConstant.ENDPOINT.ACCOUNT + '/add', jsonParser, accountService.addAccount);
  app.post(commonConstant.ENDPOINT.ACCOUNT + '/upd', jsonParser, accountService.updAccount);
  app.delete(commonConstant.ENDPOINT.ACCOUNT + '/del/:id', accountService.delAccount);

  app.get(commonConstant.ENDPOINT.ACCOUNT + '/transfer', accountService.getTransfers);
  app.get(commonConstant.ENDPOINT.ACCOUNT + '/transfer/:accountid', accountService.getTransfersByAccount);
  app.post(commonConstant.ENDPOINT.ACCOUNT + '/transfer/add', jsonParser, accountService.addTransfer);
  app.delete(commonConstant.ENDPOINT.ACCOUNT + '/transfer/del/:id', accountService.delTransfer);

}
