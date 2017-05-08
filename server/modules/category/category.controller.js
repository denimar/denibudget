const categoryService = require('./category.service');
const commonConstant = require('../../../common/common.constant');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {
  app.get(commonConstant.ENDPOINT.CATEGORY, categoryService.getCategories);
  app.get(commonConstant.ENDPOINT.CATEGORY_LIST + '/:onlyleaf', categoryService.getCategoriesList);
  app.post(commonConstant.ENDPOINT.CATEGORY + '/add', jsonParser, categoryService.addCategory);
  app.delete(commonConstant.ENDPOINT.CATEGORY + '/del/:id', categoryService.delCategory);
}
