var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRoutes = require('./routes/index');
const database = "mongodb://localhost/food-backend";
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json');
const compression = require('compression');
var app = express();

app.options('*', cors())
app.use('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

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
    app.listen(8000, () => console.log('App is running on port 8000'));
  })
  .catch((err) => console.log(err));

module.exports = app;
