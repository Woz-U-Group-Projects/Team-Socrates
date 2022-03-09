const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");


router.get('/', function(req, res, next){
  models.users.findAll({
    attributes:
    [
      'userId',
      'screenName',
    ]
  })
  .then(users => {
    const usersList = users.map(user => {
      return {userId: user.userId, username: user.username}
    });
    res.status(200).send(usersList);
  })
});

// GET users friend list
router.get('/id/:id/friends', async function(req, res, next){
  const userFriendsList = await models.mutualFriendships.findAll({
    where: { userId: req.params.id},
    attributes: ['friendId', 'createdAt'],
    include: [{model: models.users, as: 'friend', attributes: ['screenName', 'profilePic', 'firstName', 'lastName']}]
   });
  res.status(200).send(userFriendsList);
});

/* GET user profile. */
router.get('/id/:id', function(req, res, next) {
  models.users.findOne({
    where: {
      userId: req.params.id
    },
    attributes: [
      'screenName',
      'profilePic',
      'firstName',
      'lastName',
      'gender',
      'dateOfBirth',
      'city',
      'region',
      'country',
      'bio',
      'areaOfStudy',
      'userId',
      'admin',
    ]
    })
    .then( user => {
      if (!user) {
        res.status(404).send();
      }
        res.status(200).send({
          userId: user.userId,
          screenName: user.screenName,
          profilePic: user.profilePic,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          city: user.city,
          region: user.region,
          country: user.country,
          bio: user.bio,
          areaOfStudy: user.areaOfStudy,
          admin: user.admin,
        });
    })
    .catch( err => {
      console.error(err);
      res.status(500).send({
        message: err.message
      })
    })
  });

/* New user creation */
router.post('/', function(req, res, next) {
  models.users.findOrCreate({
    where: { 
      [Op.or]: [{email: {[Op.like]: req.body.email}}, {username: {[Op.like]: req.body.username}}]
    },
    defaults: {
      username: req.body.username,
      email: req.body.email,
      password: authService.hashPassword(req.body.password),
      screenName: req.body.screenName,
    }
  })
  .then(([user, created]) =>{
    if (created) {
      res.status(201).send({
        message: 'User successfully created.'
      });
    } else {
      if (user.username.toLowerCase() === req.body.username.toLowerCase()){
        res.status(409).send({
          message: 'Username already exists.'
        })
      } else if (user.email.toLowerCase() === req.body.email.toLowerCase()) {
      res.status(409).send({
        message: 'Email is taken.'
      })
      } 
    }
  })
  /* Error handling for generic 500 & invalid formatting of request */
  .catch(err => {
    if (err.name === "SequelizeValidationError") {
      res.status(400).send({
        message: 'Bad request',
        errors: err.errors
      })
    } if (!req.body.username || !req.body.password || !req.body.email || !req.body.screenName) {
      res.status(400).send({
        message: 'Bad request',
        error: 'Missing field(s)'
      })
    } else {
      console.error(err);
      res.status(500).send({
        message: err.message
      })
    }
  })
});

/* Login for existing users */
router.post('/login', function(req, res, next) {
  models.users.findOne({
    where: {
      username: {[Op.like]: req.body.username}
    }
  }).then(user => {
    if (!user) {
      res.status(401).send({
        message: "Username doesn't exist" 
      });
    } else {
      // Uses bcrpyt to verify
      const passwordMatch = authService.verifyPassword(req.body.password, user.password);
      if (!passwordMatch) {
        res.status(401).send({
          message: "Invalid password"
        })
      } else {
        const SignIn = authService.signInUser(user); // <--- Generates token & public cookie uuid
        const expiry = new Date(Date.now() + 3600000);
        // Fresh baked cookies
        // Sets PRIVATE_ID cookie from token to send to client. httpOnly indicates the cookie cannot be accessed via JS, but only http. It is set up to require https in a theoretical production environment.
        // PUBLIC_ID uuid associated with PRIVATE_ID.
        // SESSION_EXPIRATION tells client when the cookies will expire.
        res.cookie('PRIVATE_ID', SignIn.token, {expires: expiry, httpOnly: true, sameSite: true, secure: process.env.NODE_ENV === 'production'? true: false}); 
        res.cookie('PUBLIC_ID', SignIn.uuid, {expires: expiry, sameSite: true, secure: process.env.NODE_ENV === 'production'? true: false});
        res.cookie('SESSION_EXPIRATION', expiry.toTimeString(), {expires: expiry});
        res.status(200).send({
          message: "Login successful"
        })
      }
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).send({
      message: err.message
    })
  })
});




/* Account View */
router.get('/profile', function(req, res, next) {
  const auth = authService.authenticateUser(req.cookies.PRIVATE_ID, req.cookies.PUBLIC_ID);
  if (auth.ok === false) {
    res.status(auth.status).send(auth.message);
  } else {
    models.users.findOne({
        where: {
          userId: auth.decoded.userId,
          username: auth.decoded.username,
        }
      })
      .then(user => {
        res.status(200).send({
          userId: user.userId,
          username: user.username,
          email: user.email,
          screenName: user.screenName,
          profilePic: user.profilePic,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          city: user.city,
          region: user.region,
          country: user.country,
          bio: user.bio,
          areaOfStudy: user.areaOfStudy,
        })
      })
      .catch( err => {
        console.error(err);
        res.status(500).send({
          message: err.message
        })
      });
  }
});

router.put('/profile', function(req, res, next) {
  const auth = authService.authenticateUser(req.cookies.PRIVATE_ID, req.cookies.PUBLIC_ID);
  if (auth.ok === false) {
    res.status(auth.status).send(auth.message);
  }  else {
    models.users.update(
        {
          email: req.body.email,
          screenName: req.body.screenName,
          profilePic: req.body.profilePic,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          gender: req.body.gender,
          dateOfBirth: req.body.dateOfBirth,
          city: req.body.city,
          region: req.body.region,
          country: req.body.country,
          bio: req.body.bio,
          areaOfStudy: req.body.areaOfStudy,
        }, 
        { where: { 
            userId: auth.decoded.userId,
            username: auth.decoded.username
      }})
      .then(user =>{
        res.status(204).send();
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: err.message
        })
      })
    }
});
module.exports = router;
