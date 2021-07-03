var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  'name': String,
  'user': String,
  'user': {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  'count': Number,
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Category', CategorySchema);
