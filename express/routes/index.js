var express = require('express');
const { sequelize } = require('../models');
var router = express.Router();
const models = require ('../models');
var authService = require('../services/auth');

router.get('/', function(req, res, next) {
  models.threads.findOne({
    where: {
      tid: 1
    },
    include: [{
      as: "posts",
      model: models.posts
    }]
  })
  .then( thread => {
    res.send(thread);
  }
  )
  .catch(err => console.error(err))
})
module.exports = router;
