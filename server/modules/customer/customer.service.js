const customerRepository = require('./customer.repository');

module.exports = {

  getCustomers: function(req, res) {
    customerRepository.getCustomers().then(function(customers) {
      res.end(JSON.stringify(customers, null, 2));
    });
  }

}
