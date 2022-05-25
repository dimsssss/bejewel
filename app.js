const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const brandsRouter = require('./routes/brands');
const categoryRouter = require('./routes/category');
const productsRouter = require('./routes/products');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/brands', brandsRouter);
app.use('/category', categoryRouter);
app.use('/products', productsRouter);

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({error:err})
});

module.exports = app;
