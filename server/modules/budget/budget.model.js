const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema Budget Item
let budgetItemSchema = new Schema({
  budget: {
		type: Schema.Types.ObjectId,
		ref: 'Budget'
	},
  type: {
    type: String,
    enum: ['C', 'D']
  },
  description: String,
  category: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
  value: Schema.Types.Double,
  path: String
});

//Schema Budget
const budgetSchema = new Schema({
  startDate: Date,
  endDate: Date,
  description: String,
  details: [budgetItemSchema]
});

//Model
mongoose.model('Budget', budgetSchema);
