const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  stockSymbol: String,
  data: []
});
  
  module.exports = mongoose.model('Stock', stockSchema);

