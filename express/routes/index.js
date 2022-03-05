const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");


router.get('/', function(req, res, next) {
  res.send("Responding with a resource.")
})
module.exports = router;
