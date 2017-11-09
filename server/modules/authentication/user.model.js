const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema Budget Item
let userSchema = new Schema({
  name: String,
  nickName: String,
  admin: Boolean
});

//Model
mongoose.model('User', userSchema);
