const mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

//Schema
let budgetSchema = new Schema({
  startDate: Date,
  endDate: Date,
  description: String,
  details: []
});

//Model
mongoose.model('Budget', budgetSchema);
