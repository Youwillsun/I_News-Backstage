var mongoose = require('mongoose');

var newsclassSchema = require('../schemas/newsclassSchema.js');

var newsClass = mongoose.model('newsClass', newsclassSchema);

module.exports = newsClass;