import moment from 'moment'
const mongoose = require('mongoose');
import jwt from 'jsonwebtoken';
import fs from 'fs';

const model = require('./user.model');
let User = mongoose.model('User');

module.exports = {

  authenticate: (nickName, password) => {
    return new Promise(successFn => {

      User.findOne({
        nickName: nickName
      }, (err, user) => {
        if (err) throw err;

        if (user) {
          // check if password matches
          if (user.password != password) {
            successFn({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {

            // if user is found and password is right
            // create a token with only our given payload
            // we don't want to pass in the entire user since that has the password
            const payload = {
              admin: user.admin
            };
            let cert = fs.readFileSync('./private.key');  // get private key
            var token = jwt.sign({
              data: payload
            }, 'secret', { expiresIn: '4h' });

            // return the information including token as JSON
            successFn({
              success: true,
              token: token
            });
          }

        } else {
          successFn({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        }

      });

    });
  },

}
