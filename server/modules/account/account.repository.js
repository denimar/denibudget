const mongoose = require('mongoose');
const model = require('./account.model');
let Account = mongoose.model('Account');
let repositoryHelper = require('../../helper/repository.helper')(Account);

module.exports = {

  getAccounts: repositoryHelper.getAll,

}
