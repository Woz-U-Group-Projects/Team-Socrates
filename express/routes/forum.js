const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");
const notificationGenService = require('../services/notificationGen');


/* GET All Forum Categories */
router.get('/categories', function(req, res, next){
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


/* GET Threads in Category */
router.get('/categories/:nameOrId', function(req, res, next){
models.categories.findOne({
  where: {
    [Op.or]: [
      {name: {
      [Op.like]: req.params.nameOrId
    }},
    {categoryId: req.params.nameOrId} 
    ]
  },
    include: [{model: models.threads, attributes: ['subject', 'threadId', 'createdAt', 'updatedAt'], include: [{model: models.users, as: 'author', attributes: ['userId', 'firstName', 'lastName', 'screenName']}]}]
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
router.post('/categories/:nameOrId', async function(req, res, next){
  const auth = res.locals.auth;  
  if (!auth.loggedIn) {
    res.status(401).send({messag: auth.message});
  } else if (!(req.body.subject && req.body.body)){
    res.status(400).send({ message: "Missing fields" });
  } else {
    try {
      const category = await models.categories.findOne({
        where:
        {[Op.or]: [{name: {[Op.like]: req.params.nameOrId}}, 
        {categoryId: req.params.nameOrId}]
        },
        attributes: ['categoryId', 'name']});
  
      const newThread = await models.threads.create({
          categoryId: category.categoryId,
          authorId: auth.decoded.userId,
          subject: req.body.subject
        });
  
      const threadStarter = await models.posts.create({
            threadId: newThread.threadId,
            authorId: auth.decoded.userId,
            body: req.body.body,
            threadStarter: true, 
        });
      res.status(201).send({message: "Thread successfully created", thread: newThread, threadStarter: threadStarter, postedIn: category});
      notificationGenService.generate(newThread, 4);
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
          include: [{model: models.users, as: 'author', attributes: userAttributes}]
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
router.post('/threads/:id', async function(req, res, next){
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({message: auth.message});
  } else  {
    try{
  const newPost = await models.posts.create({
    threadId: parseInt(req.params.id),
    authorId: auth.decoded.userId,
    body: req.body.body,
  });
  await models.threads.update(
    { lastBumped: Date() },
    { where: {threadId: req.params.id} }
  )
    res.status(201).send({newPost});

  notificationGenService.generate(newPost, 5);
  } catch {
    console.error(err);
    res.status(500).send({
      message: err.message
    })
  }
  }
});
// Get all subscriptions
router.get('/subscriptions', async function(req, res, next){
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({message: auth.message});
  } else  {
    const subscriptions = await models.threadSubscriptions.findAll({where: {subscriberId: auth.decoded.userId}});
    res.status(200).send(subscriptions);
  }
});
// See if subscription exists
router.get('/subscriptions/:id', async function(req, res, next){
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({message: auth.message});
  } else  {
    const subscription = await models.threadSubscriptions.findOne({where: {subscriberId: auth.decoded.userId, threadId: parseInt(req.params.id)}});
    if (!subscription){
      res.status(404).send({message: "Subscription not found"})
    }
    res.status(200).send(subscription);
  }
});
// Subscribe to Thread
router.post('/subscriptions/:id', function(req, res, next){
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({message: auth.message});
  } else  {
    models.threadSubscriptions.findOrCreate({where: {subscriberId: auth.decoded.userId, threadId: parseInt(req.params.id)}})
    .then(([subscription, created]) =>{
      if (created){
        res.status(200).send(subscription);
      } else {
        res.status(409).send({message: "Subscription already exists"});
      }
    })
    .catch(err => {
      console.error(err)
    });
  }
});
// Unsubscribe
router.delete('/subscriptions/:id', async function(req, res, next){
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({message: auth.message});
  } else  {
    const unSub = await models.threadSubscriptions.findOne({where: {subscriberId: auth.decoded.userId, threadId: parseInt(req.params.id)}});
    if (unSub){
      unSub.destroy();
      res.status(204).send();
    } else {
      res.status(404).send({message: "Subscription not found"});
    }
  }
});
/* PUT Forum Post */
/* DELETE Forum Post */


module.exports = router;