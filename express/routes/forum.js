const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");


/* GET All Forum Categories */
router.get('/', function(req, res, next){
  models.categories.findAll()
  .then(categories => {res.send(categories)})
  .catch(err => {
    console.error(err);
    res.status(500).send(err.message);
  })
});

/* POST Forum, Admin Only */
/* PUT Forum, Admin Only */
/* DELETE Forum, Admin Only */


/* GET Category with threads */
router.get('/:name', function(req, res, next){
models.categories.findOne({
  where: {
    name: {
      [Op.like]: req.params.name
    }
  },
    include: [{model: models.threads, attributes: ['subject', 'threadId', 'authorId', 'createdAt', 'updatedAt'], include: [{model: models.users, as: 'author', attributes: ['userId', 'firstName', 'lastName', 'screenName']}]}]
})
  .then(category => {
    if (!category){
      res.status(404).send();
    } else {
      res.send(category);
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).send(err.message);
  })
});
/* POST New Thread */

// Trying async here for less messy looking code
router.post('/:name', async function(req, res, next){
  if (!(req.cookies.PRIVATE_ID && req.cookies.PUBLIC_ID)) {
    res.status(401).send({ message: "Login tokens not found" });
  } 
  const decoded = authService.decodeToken(req.cookies.PRIVATE_ID);
  if (!(authService.crossReference(decoded, req.cookies.PUBLIC_ID))) {
    res.status(401).send({ message: "Invalid or expired token" });
  }
  if (!(req.body.subject && req.body.body)){
    res.status(400).send({ message: "Missing fields" });
  } else {
    try {
      const category = await models.categories.findOne({
        where: { name: { [Op.like]: req.params.name } },
        attributes: ['categoryId', 'name']})
  
      const newThread = await models.threads.create({
          categoryId: category.categoryId,
          authorId: decoded.userId,
          subject: req.body.subject
        })
  
      const threadStarter = await models.posts.create({
            threadId: newThread.threadId,
            userId: decoded.userId,
            body: req.body.body,
            threadStarter: true, 
        })
      res.status(201).send({message: "Thread successfully created", thread: newThread, threadStarter: threadStarter, postedIn: category});
    } catch {
      console.error(err);
      res.status(500).send({
        message: err.message
      })
    }
    
     
  }
});
/* PUT Thread */
/* DELETE Thread */


/* GET Thread */
router.get('/threads/:id', function(req, res, next){
  const threadAttributes = ['threadId', 'subject', 'lastBumped', 'createdAt', 'updatedAt'];
  const categoryAttributes = ['name'];
  const postAttributes = ['postId', 'body', 'createdAt', 'updatedAt'];
  const userAttributes = ['userId', 'screenName', 'firstName', 'lastName', 'gender', 'city', 'country', 'areaOfStudy'];
  models.threads.findOne({
    where: {
      ThreadId: req.params.id
    },
    attributes: threadAttributes,
    include: [
        {
          model: models.posts, 
          attributes: postAttributes,
          include: [{model: models.users, attributes: userAttributes}]
        },
        {
          model: models.categories,
          attributes: categoryAttributes
        }
    ],
  })
  .then(thread => {
    res.send(thread);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send({
      message: err.message
    })
  })
});
/* POST Thread reply */
router.post('/threads/:id', function(req, res, next){
  if (!(req.cookies.PRIVATE_ID && req.cookies.PUBLIC_ID)) {
    res.status(401).send({
      message: "Login tokens not found"
    })
  } 
  const decoded = authService.decodeToken(req.cookies.PRIVATE_ID);
  if (!(authService.crossReference(decoded, req.cookies.PUBLIC_ID))) {
    res.status(401).send({
      message: "Invalid or expired token"
    })
  } else {
  models.posts.create({
    threadId: req.params.id,
    userId: decoded.userId,
    body: req.body.body,
  })
  .catch(err => {
    console.error(err);
    res.status(500).send({
      message: err.message
    })
  })
  models.threads.update(
    { lastBumped: Date() },
    { where: {threadId: req.params.id} }
  )
  .then(
    res.status(201).send({
      message: 'Message posted'
    })
  )
  .catch(err => {
    console.error(err);
    res.status(500).send({
      message: err.message
    })
  })
  }
});
/* PUT Forum Post */
/* DELETE Forum Post */


module.exports = router;