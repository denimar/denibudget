const mongoose = require('mongoose');
const model = require('./customer.model');
let Customer = mongoose.model('Customer');
let repositoryHelper = require('../../helper/repository.helper')(Customer);

module.exports = {

  getCustomers: repositoryHelper.getAll

}
