let mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema
let categorySchema = new Schema({
  text: String,
  parent: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
  isLeaf: Boolean
});

//Model
mongoose.model('Category', categorySchema);
