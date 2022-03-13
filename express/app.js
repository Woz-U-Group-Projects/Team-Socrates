const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({storage: fileStorageEngine, limits: {fileSize: 2000000}, fileFilter(req, file, cb){
  if (!file.originalname.match(/\.(png|jpg)$/)) { 
    // upload only png and jpg format
    return cb(new Error('Please upload a png or jpg image'));
  }
cb(undefined, true);
}});
module.exports = upload;


const models = require('./models');
const cors = require("cors");
const authService = require('./services/auth');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const forumRouter = require('./routes/forum');
const socialRouter = require('./routes/social');
const testRouter = require('./routes/test')

const app = express();

 // hbs engine if needed
 //app.set('views', path.join(__dirname, 'views'));
 //app.set('view engine', 'hbs');


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


// Check for user authentication
app.use(function(req, res, next) {
  res.locals.auth = authService.authenticateUser(req.cookies.PRIVATE_ID, req.cookies.PUBLIC_ID);
  next();
});

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/forum', forumRouter);
app.use('/api/social', socialRouter);
app.use('/api/test', testRouter);
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
  res.status(err.status || 500).send({message: err.message});
});

models.sequelize.sync().then(function() { 
  console.log("Database Synchronized") 
}); 

module.exports = app;
