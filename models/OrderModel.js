var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  'total': Number,
  'subTotal': Number,
  'tax': Number,
  'taxType': String,
  'products': Array,
  'createdAt': Date,
  'updatedAt': Date,
  status: { type: String, default: 'pending', enum: ['pending', 'completed', 'canceled'] },
  'user': {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  'date': String,
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Order', OrderSchema);
