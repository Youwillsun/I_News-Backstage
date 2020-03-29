var mongoose = require('mongoose');

var newsPraisedSchema = require('../schemas/newsPraisedSchema.js');

var newsPraised = mongoose.model('newsPraised', newsPraisedSchema);

module.exports = newsPraised;