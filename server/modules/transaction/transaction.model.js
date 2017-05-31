const mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema
let transactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  description: String,
  type: {
    type: String,
    enum: ['C', 'D']
  },
  budgetItem: Schema.Types.ObjectId,
  account: {
		type: Schema.Types.ObjectId,
		ref: 'Account'
	},
  category: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
  value: Schema.Types.Double,
  path: String,
});

//Model
mongoose.model('Transaction', transactionSchema);
