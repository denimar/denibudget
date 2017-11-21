const authenticationRepository = require('./authentication.repository');

module.exports = {

  authenticate: (req, res) => {
    authenticationRepository
      .authenticate(req.body.database, req.body.nickName, req.body.password, res)
      .then((authenticationData) => {
        res.end(JSON.stringify(authenticationData, null, 2));
      }, (err) => {
        throw new Error(err);
      });
  }

}
