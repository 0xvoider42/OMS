const mongoose = require('mongoose');

const imagePath = 'uploads/images';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  acquireDate: {
    type: Date,
    require: true,
  },
  type: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  itemImage: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
});

module.exports = mongoose.model('Item', itemSchema);
module.exports.imagePath = imagePath;
