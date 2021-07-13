var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  'firstName': { type: String, default: '' },
  'lastName': { type: String, default: '' },
  'lang': { type: String, default: '' },
  'image': { type: String, default: '' },
  'email': { type: String, default: '', required: true },
  'password': { type: String, default: '', required: true },
  'phone': { type: String, default: '' },
  'address': { type: String, default: '' },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('User', UserSchema);
