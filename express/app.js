const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const forumRouter = require('./routes/forum');

const app = express();

 // hbs engine if needed
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'hbs');


 const corsOptions = {
   origin: ['http://localhost:4200', 'http://localhost:8100'],
   methods: 'GET,PUT,POST,DELETE,OPTIONS',
   allowedHeaders: 'Access-Control-Allow-Origin,Origin,X-Requested-With,Content-Type,Accept,withCredentials,Cookie',
   credentials: true
 }
app.use(cors(corsOptions)); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/forum', forumRouter);

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

models.sequelize.sync().then(function() { 
  console.log("Database Synchronized") 
}); 

module.exports = app;
