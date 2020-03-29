var mongoose = require('mongoose');

var commentSchema = require('../schemas/commentSchema.js');

var comment = mongoose.model('comment', commentSchema);

module.exports = comment;