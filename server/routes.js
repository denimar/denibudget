module.exports = function(app) {

  require('./modules/category/category.controller.js')(app);
  require('./modules/account/account.controller.js')(app);
  require('./modules/customer/customer.controller.js')(app);
  require('./modules/transaction/transaction.controller.js')(app);
  require('./modules/budget/budget.controller.js')(app);

}
