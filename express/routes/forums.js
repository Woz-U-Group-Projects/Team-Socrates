const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");


/* GET All Forums */
router.get('/', function(req, res, next){
  models.forums.findAll()
  .then(forums => {res.send(forums)})
  .catch(err => {
    console.error(err);
    res.status(500).send(err.message);
  })
});

/* POST Forum, Admin Only */
/* PUT Forum, Admin Only */
/* DELETE Forum, Admin Only */


/* GET Forum with threads */
router.get('/:name', function(req, res, next){
models.forums.findOne({
  where: {
    name: {
      [Op.like]: req.params.name
    }
  },
    include: [{model: models.threads, attributes: ['subject', 'threadId', 'createdAt', 'updatedAt'], include: [{model: models.users, attributes: ['userId', 'firstName', 'lastName', 'screenName']}]}]
})
  .then(forum => {
    if (!forum){
      res.status(404).send();
    } else {
      res.send(forum);
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).send(err.message);
  })
});
/* POST Forum Thread */
/* PUT Forum Thread */
/* DELETE Forum Thread */


/* GET Forum Posts */
router.get('/threads/:id', function(req, res, next){
  models.threads.findOne({
    where: {
      name: {
        [Op.like]: req.params.name
      }
    },
    attributes: [
      'name',
      'forumId',
    ],
    include: [
      {model: models.threads, where: {threadId: req.params.id}, include: [
        {model: models.posts}
      ]}
    ],
  })
  .then(thread => {
    res.send(thread);
  })
});
/* POST Forum Post */
/* PUT Forum Post */
/* DELETE Forum Post */


module.exports = router;