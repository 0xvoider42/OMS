const express = require('express');
const Category = require('../models/category');
const Router = express.Router();

// All categories
Router.get('/', async (req, res) => {
  let search = {};

  if (req.query.name != null && req.query.name !== '') {
    search.name = new RegExp(req.query.name, 'i');
  }
  try {
    const categories = await Category.find(search);
    res.render('categories/index', {
      categories: categories,
      search: req.query,
    });
  } catch {
    res.redirect('/');
  }
});

// New category
Router.get('/new', (req, res) => {
  res.render('categories/new', { category: new Category() });
});

// Create category
Router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();

    // res.redirect(`categories/${category.id}`);
    res.redirect('categories');
  } catch {
    res.render('categories/new', {
      category: category,
      errorMessage: 'Error creating category',
    });
  }
});

module.exports = Router;
