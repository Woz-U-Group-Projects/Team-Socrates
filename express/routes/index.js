const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");


router.get('/', function(req, res, next) {
  res.send("Responding with a resource.")
})
module.exports = router;


/* Test Route for authentication user cookies */
router.get('/auth', function(req, res, next) {
  if (req.cookies.PUBLIC_ID && req.cookies.PRIVATE_ID){
  } else {
    res.status(401).send({message: "Missing token"})
  }
});