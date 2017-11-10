const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Budget Item
let userSchema = new Schema({
  name: String,
  nickName: String,
  password: String,
  admin: Boolean
});

//Model
mongoose.model('User', userSchema);
