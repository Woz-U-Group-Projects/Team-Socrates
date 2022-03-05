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
      'username'
    ]
  })
  .then(users => {
    const usersList = users.map(user => {
      return {userId: user.userId, username: user.username}
    });
    res.status(200).send(usersList);
  })
});
/* New user creation */
router.post('/', function(req, res, next) {
  models.users.findOrCreate({
    where: { 
      [Op.or]: [{email: req.body.email}, {username: req.body.username}]
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
      if (user.username === req.body.username){
        res.status(409).send({
          message: 'Username already exists.'
        })
      } else if (user.email === req.body.email) {
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
    } if (!req.body.username || !req.body.password || !req.body.email) {
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
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      res.status(401).send({
        message: "Username doesn't exist" 
      });
    } else {
      // Uses bcrpyt to verify
      let passwordMatch = authService.verifyPassword(req.body.password, user.password);
      if (passwordMatch) {
        let SignIn = authService.signInUser(user); // <--- Generates token & public cookie uuid
        res.cookie('jwt', SignIn.token, {httpOnly: true, sameSite: true, secure: process.env.NODE_ENV === 'production'? true: false}); // <--- Sets cookie from token to send to client. httpOnly indicates the cookie cannot be accessed via JS, but only http. It is set up to require https in a theoretical production environment.
        res.cookie('public-session', SignIn.uuid, {expire: 3600000, sameSite: true, secure: process.env.NODE_ENV === 'production'? true: false});
        res.status(200).send({
          message: "Login successful"
        })
      } else {
        res.status(401).send({
          message: "Invalid password"
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

/* GET users listing. */
router.get('/id/:id', function(req, res, next) {
  models.users.findOne({
    where: {
      userId: req.params.id
    },
    attributes: [
      'username',
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
      'email',
    ]
    })
    .then( user => {
      if (user) {
        res.status(200).send({
          userId: user.userId,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          city: user.city,
          region: user.region,
          country: user.country,
          bio: user.bio,
          areaOfStudy: user.areaOfStudy,
        });
      } else {
        res.status(404).send();
      }
    })
    .catch( err => {
      console.error(err);
      res.status(500).send({
        message: err.message
      })
    })
  });

/* Account View */
router.get('/profile', function(req, res, next) {
  if (req.cookies.jwt) {
    let decoded = authService.decodeToken(req.cookies.jwt);
    if (decoded) {
      models.users.findOne({
        where: {
          userId: decoded.userId,
          username: decoded.username,
        }
      })
      .then(user => {
        res.status(200).send({
          userId: user.userId,
          username: user.username,
          email: user.email,
          screenName: user.screenName,
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
    } else {
      res.status(401).send({
        message: "Invalid or expired token"
      })
    }
  } else {
    res.status(401).send({
      message: "No token found"
    })
  }
});

router.put('/profile', function(req, res, next) {
  if (req.cookies.jwt) {
    let decoded = authService.decodeToken(req.cookies.jwt);
    if (decoded) {
      models.users.update(
        {
          email: req.body.email,
          screenName: req.body.screenName,
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
            userId: decoded.userId,
            username: decoded.username
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
    } else {
      res.status(401).send({
        message: "Invalid or expired token"
      })
    }
  } else {
    res.status(401).send({
      message: "No token found"
    })
  }
});
module.exports = router;
