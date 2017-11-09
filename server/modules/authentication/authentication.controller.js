const authenticationService = require('./authentication.service');
const commonConstant = require('../../../common/common.constant');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {

  app.post(commonConstant.ENDPOINT.LOGIN + '/authenticate', jsonParser, authenticationService.authenticate);

}
