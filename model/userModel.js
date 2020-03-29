var mongoose = require('mongoose');

var userSchema = require('../schemas/userSchema.js');

var user = mongoose.model('user',userSchema);

module.exports = user;