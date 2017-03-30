const customerService = require('./customer.service');
const commonConstant = require('../../../common/common.constant');

module.exports = function(app) {
  app.get(commonConstant.ENDPOINT.CUSTOMER, customerService.getCustomers);
}
