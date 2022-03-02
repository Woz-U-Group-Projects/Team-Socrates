var express = require('express');
const { sequelize } = require('../models');
var router = express.Router();
const models = require ('../models');
var authService = require('../services/auth');

router.get('/', function(req, res, next) {
  res.send("Responding with a resource.")
})
module.exports = router;
