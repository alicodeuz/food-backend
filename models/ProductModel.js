var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  'name': String,
  'price': Number,
  'salePrice': Number,
  'description': String,
  'category': [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  'image': String,
  'rate': Number,
  'user': {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Product', ProductSchema);
