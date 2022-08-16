if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');
const itemRouter = require('./routes/item');

mongoose.connect(process.env.DATABASE_URL, (err) => {
  console.log('Database connected successfully', err);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/', indexRouter);
app.use('/categories', categoryRouter);
app.use('/items', itemRouter);

app.listen(process.env.PORT || 3000);
