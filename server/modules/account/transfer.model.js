const mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema
let transferSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  to: {
		type: Schema.Types.ObjectId,
		ref: 'Account'
	},
  date: {
    type: Date,
    default: Date.now
  },
  value: Schema.Types.Double
});

//Model
mongoose.model('Transfer', transferSchema);
