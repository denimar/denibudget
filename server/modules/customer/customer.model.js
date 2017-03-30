const mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema
let customerSchema = new Schema({
  code: Schema.Types.Double,
  name: String,
  email: String,
  active: Boolean,
  satisfaction: Schema.Types.Double
});

//Model
mongoose.model('Customer', customerSchema);
