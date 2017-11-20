import moment from 'moment'
const mongoose = require('mongoose');
import jwt from 'jsonwebtoken';
import fs from 'fs';
import authenticationHelper from './authentication.helper';
import ms from 'ms';

import bcrypt from 'bcrypt-nodejs';

const model = require('./user.model');
let User = mongoose.model('User');

module.exports = {

  authenticate: (nickName, password, res) => {

    return new Promise(successFn => {
      res.cookie('auth', '');

      rodar aqui o mongoose.connect(MONGODB_URI, options) com a base que o usuário selecionar no login...
      verificar se o usuário está tentando logar na mesma base e esta já está conectada... neste caso não precisa conectar novamente...

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
