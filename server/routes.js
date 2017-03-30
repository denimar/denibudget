module.exports = function(app) {

  require('./modules/category/category.controller.js')(app);
  require('./modules/account/account.controller.js')(app);
  require('./modules/customer/customer.controller.js')(app);
  require('./modules/bill/bill.controller.js')(app);

}
