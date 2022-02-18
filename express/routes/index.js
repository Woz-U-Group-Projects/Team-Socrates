var express = require('express');
var router = express.Router();
const models = require ('../models');
var authService = require('../services/auth');

router.get('/', function(req, res, next) {
  res.send('Hello World!');
});


module.exports = router;
