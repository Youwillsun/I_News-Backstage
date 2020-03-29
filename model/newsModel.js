var mongoose = require('mongoose');

var newsSchema = require('../schemas/newsSchema.js');

var news = mongoose.model('news', newsSchema);

module.exports = news;