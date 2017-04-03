const mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema
let budgetSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  description: String,
  type: {
    type: String,
    enum: ['C', 'D']
  },
  category: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
  value: Schema.Types.Double
});

//Model
mongoose.model('Budget', budgetSchema);
