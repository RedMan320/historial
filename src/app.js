require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const localUser = require('./middleware/localUser');
var method = require('method-override');
var indexRouter = require('./routes/index');
var app = express();

app.set('trust proxy', true);

app.use(method('_method'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..','public')));
app.use(session({
  secret: 'mi secreto',
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true, // La cookie no será accesible a través de JavaScript
    secure: process.env.NODE_ENV === 'production', // Solo se enviará por HTTPS en producción
  },
}));


app.use(localUser)

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(res.status(404).render('error', {title : 'Pagina no encontrada'}));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
