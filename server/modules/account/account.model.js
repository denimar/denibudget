const mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema
let accountSchema = new Schema({
  name: String,
  initialValue: Schema.Types.Double
});

//Model
mongoose.model('Account', accountSchema);
