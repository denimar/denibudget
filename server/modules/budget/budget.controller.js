const budgetService = require('./budget.service');
const commonConstant = require('../../../common/common.constant');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {

  app.get(commonConstant.ENDPOINT.BUDGET, budgetService.getBudgets);
  app.post(commonConstant.ENDPOINT.BUDGET + '/add', jsonParser, budgetService.addBudget);
  app.post(commonConstant.ENDPOINT.BUDGET + '/upd', jsonParser, budgetService.updBudget);
  app.delete(commonConstant.ENDPOINT.BUDGET + '/del/:id', budgetService.delBudget);

}
