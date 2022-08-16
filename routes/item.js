const express = require('express');
const Category = require('../models/category');
const Item = require('../models/item');
const Router = express.Router();

// All items
Router.get('/', async (req, res) => {
  res.send('All Books');
});

// New item
Router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find({});
    const item = new Item();
    res.render('items/new', {
      categories: categories,
      item: item,
    });
  } catch {
    res.redirect('/items');
  }
});

// Create item
Router.post('/', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    category: req.body.category,
    createdDate: new Date(req.body.createdDate),
    amount: req.body.amount,
    description: req.body.description,
  });
});

module.exports = Router;
