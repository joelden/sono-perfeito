// Constantes de configuração
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const session = require('express-session')
// Arquivos de rotas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const servicesRouter = require('./routes/services');
const callingRouter = require('./routes/calling');
const mongoose = require('mongoose');

// Configurations
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Connect BD
mongoose.connect('mongodb://localhost:27017/arPuro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Conectado");
}).catch((err) => {
  console.log("Erro ao conectar ao MondoDB! " + err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/services', servicesRouter);
app.use('/calling', callingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
