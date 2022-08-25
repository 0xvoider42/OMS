const mongoose = require('mongoose');
const path = require('path');

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

itemSchema.virtual('itemImagePath').get(function () {
  if (this.itemImage != null) {
    return path.join('/', imagePath, this.itemImage);
  }
});

module.exports = mongoose.model('Item', itemSchema);
module.exports.imagePath = imagePath;
