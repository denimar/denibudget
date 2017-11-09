const authenticationRepository = require('./authentication.repository');

module.exports = {

  authenticate: (req, res) => {
    authenticationRepository.authenticate(req.body)
      .then((authenticationData) => {
        res.end(JSON.stringify(authenticationData, null, 2));
      });
  }

}
