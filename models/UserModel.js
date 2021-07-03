var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  'firstName': String,
  'lastName': String,
  'lang': String,
  'image': String,
  'email': String,
  'password': String,
  'phone': String,
  'address': String,
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('User', UserSchema);
