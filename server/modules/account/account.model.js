const mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema
let accountSchema = new Schema({
  name: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  openingBalance: Schema.Types.Double
});

//Model
mongoose.model('Account', accountSchema);
