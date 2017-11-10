import moment from 'moment'
const mongoose = require('mongoose');
import jwt from 'jsonwebtoken';
import fs from 'fs';
import authenticationHelper from './authentication.helper';
import ms from 'ms';

const model = require('./user.model');
let User = mongoose.model('User');

module.exports = {

  authenticate: (nickName, password, res) => {
    return new Promise(successFn => {

      User.findOne({
        nickName: nickName
      }, (err, user) => {
        if (err) throw err;

        if (user) {
          if (user.password != password) {
            successFn({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {
            let token = authenticationHelper.createToken(user, '4h');
            res.cookie('auth', token);
            successFn({
              token: token,
              success: true
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
