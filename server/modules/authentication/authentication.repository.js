import moment from 'moment'
const mongoose = require('mongoose');
import jwt from 'jsonwebtoken';
import fs from 'fs';
import authenticationHelper from './authentication.helper';
import ms from 'ms';
import Connection from '../../Connection';
const conn = new Connection();
import bcrypt from 'bcrypt-nodejs';
const model = require('./user.model');

module.exports = {

  authenticate: (database, nickName, password, res) => {
    conn.setDatabase(database);

    return new Promise(successFn => {
      res.cookie('auth', '');

      let User = conn.getConnection().model('User');

      User.findOne({
        nickName: nickName
      }, (err, user) => {
        if (err) throw err;

        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            let token = authenticationHelper.createToken(user, '4h');
            res.cookie('auth', token);
            successFn({
              token: token,
              success: true
            });
          } else {
            successFn({
              success: false,
              message: 'Authentication failed. Wrong password.'
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
