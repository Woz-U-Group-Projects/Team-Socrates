const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");


//GET Pending Friend Requests
router.get('/friends/incomingRequests', async function(req, res, next){
  const auth = authService.authenticateUser(req.cookies.PRIVATE_ID, req.cookies.PUBLIC_ID);
  if (auth.ok === false) {
    res.status(auth.status).send(auth.message);
  } else {
  try {
    const incomingRequests = await models.friendRequests.findAll({
      where: { toUser: auth.decoded.userId},
      include: [{model: models.users, as: 'sender', attributes: ['screenName', 'profilePic', 'firstName', 'lastName']}]
    });
  res.send(incomingRequests);
  } catch {
   console.error(err);
   res.status(500).send(err.message);
  }
 
  }
});
//GET Pending Sent Friend Requests
router.get('/friends/pendingRequests', async function(req, res, next){
  const auth = authService.authenticateUser(req.cookies.PRIVATE_ID, req.cookies.PUBLIC_ID);
  if (auth.ok === false) {
    res.status(auth.status).send(auth.message);
  } else {
    const pendingRequests = await models.friendRequests.findAll({
      where: { fromUser: auth.decoded.userId},
      include: [{model: models.users, as: 'receiver', attributes: ['screenName', 'profilePic', 'firstName', 'lastName']}]
    });
  res.send(pendingRequests);
  }
});
//POST Send Friend Request
router.post('/friends/newRequest', async function(req, res, next){
  const auth = authService.authenticateUser(req.cookies.PRIVATE_ID, req.cookies.PUBLIC_ID);
  if (auth.ok === false) {
    res.status(auth.status).send(auth.message);
  } else {
    const existingRequest = 
    await models.friendRequests.findOne(
      {where: {[Op.and]: 
        [{fromUser: {[Op.or]: [auth.decoded.userId, req.body.toUser]}}, 
         {toUser: {[Op.or]: [auth.decoded.userId, req.body.toUser]}},
        ]}});
   
      if (existingRequest){
        res.status(400).send({existingRequest})} 
      else { 
        const existingFriend = await models.mutualFriendships.findOne({where: {userId: auth.decoded.userId, friendId: req.body.toUser}});
          if (existingFriend){res.status(400).send({message: 'That user is already friended.'})}
        const newRequest = await models.friendRequests.create({fromUser: auth.decoded.userId, toUser: req.body.toUser});
        res.status(201).send(newRequest);
  }};
});
//PUT Accept Friend Request
router.put('/friends/incomingRequests/:id', async function(req, res, next){
  const auth = authService.authenticateUser(req.cookies.PRIVATE_ID, req.cookies.PUBLIC_ID);
  if (auth.ok === false) {
    res.status(auth.status).send(auth.message);
  } else {
    const requestToAccept = await models.friendRequests.findOne({where: {toUser: auth.decoded.userId, fromUser: req.params.id}});
    if (!(requestToAccept)) {
      res.status(400).send({message: "No friend request found."});  
    } else {
      await models.mutualFriendships.create({userId: auth.decoded.userId, friendId: requestToAccept.fromUser});
      await models.mutualFriendships.create({userId: requestToAccept.fromUser, friendId: auth.decoded.userId});
      await requestToAccept.destroy();models.friendRequests.destroy({where: {toUser: auth.decoded.userId, fromUser: req.params.id}});
      res.status(200).send({message: "Friend accepted."});
    }
  }
});


//GET Your friend list
router.get('/friends', async function(req, res, next){
  const auth = authService.authenticateUser(req.cookies.PRIVATE_ID, req.cookies.PUBLIC_ID);
  if (auth.ok === false) {
    res.status(auth.status).send(auth.message);
  } else {

    
  }
});


//PUT Reject Friend Request

//PUT Cancel Sent Friend Request

//DELETE Unfriend


module.exports = router;