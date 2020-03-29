var mongoose = require('mongoose');

var newsCollectionSchema = require('../schemas/newsCollectionSchema.js');

var newsCollection = mongoose.model('newsCollections', newsCollectionSchema);

module.exports = newsCollection;