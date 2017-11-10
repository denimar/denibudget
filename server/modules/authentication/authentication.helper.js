import jwt from 'jsonwebtoken';
import fs from 'fs';

module.exports = {

  checkToken: (req, res) => {
    let body = req.body || {};
    let query = req.query || {};
    let token = body.token || query.token || req.headers['x-access-token'];
    if (token) {
      let cert = fs.readFileSync('./private.key');  // get private key
      jwt.verify(token, cert, function(err, decoded) {
        console.log('**********************');
        console.log(decoded);
        console.log('**********************');

        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  }

}
