import jwt from 'jsonwebtoken';
import fs from 'fs';
const AUTH_PRIVATE_KEY = fs.readFileSync('./private.key');  // get private key

module.exports = {

  createToken: (user, expiresIn) => {
    const payload = {
      admin: user.admin
    };
    return jwt.sign({ data: payload }, AUTH_PRIVATE_KEY, { expiresIn: expiresIn });
  },

  checkToken: (req, res) => {
    let token = req.headers['x-access-token'];
    let isItOk = false;
    if (token) {
      jwt.verify(token, AUTH_PRIVATE_KEY, function(err, decodedUser) {
        if (err) {
          res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.',
            class: err.name
          });
        } else {
          if (!decodedUser.admin) {
            //TODO: make some checks for non-admin users
          }
          isItOk = true;
        }
      });
    } else {
      res.status(403).send({
        success: false,
        message: 'No token provided',
        class: 'NoTokenProvideError'
      });
    }

    return isItOk;
  }

}
