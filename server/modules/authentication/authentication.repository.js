import moment from 'moment'
const mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports = {

  authenticate: () => {
    return new Promise((successFn) => {
      successFn({
        name: 'Denimar de Moraes',
        nickName: 'Denimar',
        idade: 39
      });
    });
  },

}
