const express = require('express');
const Category = require('../models/category');
const Item = require('../models/item');
const path = require('path');
const fs = require('fs');
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
  let query = Item.find();
  if (req.query.name != '' && req.query.name != null) {
    query = query.regex('name', new RegExp(req.query.name, 'i'));
  }
  if (req.query.addedBefore != '' && req.query.addedBefore != null) {
    query = query.lte('acquireDate', req.query.addedBefore);
  }
  if (req.query.addedAfter != '' && req.query.addedAfter != null) {
    query = query.gte('acquireDate', req.query.addedAfter);
  }
  try {
    const items = await query.exec({});
    res.render('items/index', {
      items: items,
      searchOptions: req.query,
    });
  } catch {
    res.redirect('/');
  }
});

// New item
Router.get('/new', async (req, res) => {
  renderNewPage(res, new Item());
});

// Create item
Router.post('/', upload.single('image'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null;
  const item = new Item({
    name: req.body.name,
    category: req.body.category,
    acquireDate: req.body.acquireDate,
    amount: req.body.amount,
    itemImage: fileName,
    description: req.body.description,
  });
  try {
    const newItem = await item.save();
    res.redirect('items');
  } catch {
    if (item.itemImage != null) {
      removeItemImage(item.itemImage);
    }
    renderNewPage(res, item, true);
  }
});

function removeItemImage(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.log(err);
  });
}

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
