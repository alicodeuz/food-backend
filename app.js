var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/UserRoutes');
var ordersRouter = require('./routes/OrderRoutes');
var productsRouter = require('./routes/ProductRoutes');
var categoryRouter = require('./routes/CategoryRoutes');
var indexRoutes = require('./routes/index');
const database = "mongodb://localhost/food-backend";
const mongoose = require('mongoose');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose
  .connect(database, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    app.listen(8002, () => console.log('App is running on port 8000'));
  })
  .catch((err) => console.log(err));

module.exports = app;
