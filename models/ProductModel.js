var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  'name': { type: String, default: '', required },
  'price': { type: Number, default: '', required: true },
  'salePrice': { type: Number, default: '', required: true },
  'description': { type: String, default: '' },
  'category': [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  'image': String,
  'rate': Number,
  'user': {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Product', ProductSchema);
