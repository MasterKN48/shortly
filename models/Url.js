const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  userId: String,
  date: { 
    type: String, default: Date.now 
  }
});

module.exports = mongoose.model('Url', urlSchema);
