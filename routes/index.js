const express = require('express');
const Router = express.Router();
const Item = require('../models/item');

Router.get('/', async (req, res) => {
  let items = {};
  try {
    items = await Item.find().sort({ createdAt: 'desc' }).limit(10).exec();
  } catch {
    items = [];
  }
  res.render('index', { items: items });
});

module.exports = Router;
