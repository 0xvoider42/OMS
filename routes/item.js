const express = require('express');
const Category = require('../models/category');
const Item = require('../models/item');
const path = require('path');
const multer = require('multer');
const uploadPath = path.join('public', Item.imagePath);
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'];
const Router = express.Router();
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

// All items
Router.get('/', async (req, res) => {
  res.send('All Books');
});

// New item
Router.get('/new', async (req, res) => {
  renderNewPage(res, new Category());
});

// Create item
Router.post('/', upload.single('image'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null;
  const item = new Item({
    name: req.body.name,
    category: req.body.category,
    createdDate: new Date(req.body.createdDate),
    amount: req.body.amount,
    imageName: fileName,
    description: req.body.description,
  });

  try {
    const newItem = await item.save();
    res.redirect('items');
  } catch {
    renderNewPage(res, item, true);
  }
});

// Renders new page in case of error
async function renderNewPage(res, item, hasError = false) {
  try {
    const categories = await Category.find({});
    const params = {
      categories: categories,
      item: item,
    };
    if (hasError) params.errorMessage = "Couldn't add an item";
    res.render('items/new', params);
  } catch {
    res.redirect('/items');
  }
}

module.exports = Router;
