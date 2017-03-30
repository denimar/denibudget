const billService = require('./bill.service');
const commonConstant = require('../../../common/common.constant');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {

  app.get(commonConstant.ENDPOINT.BILL, billService.getBills);
  app.post(commonConstant.ENDPOINT.BILL + '/add', jsonParser, billService.addBill);
  app.delete(commonConstant.ENDPOINT.BILL + '/del/:id', billService.delBill);

}
