const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");
const notificationGenService = require('../services/notificationGen');

//Route for testing newly added features
router.get('/', async function(req, res, next) {
  res.send(await models.userNotifications.findAll());
});

module.exports = router;