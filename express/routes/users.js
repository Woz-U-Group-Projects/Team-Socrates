var express = require('express');
var router = express.Router();
const models = require ('../models');
var authService = require('../services/auth');
const { Op } = require("sequelize");


router.get('/', function(req, res, next){
  models.users.findAll({
    attributes:
    [
      'uid',
      'username'
    ]
  })
  .then(users => {
    const usersList = users.map(user => {
      return {userId: user.uid, username: user.username}
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
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      areaOfStudy: req.body.areaOfStudy,
      email: req.body.email,
      username: req.body.username
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
        error: err
      })
    } if (!req.body.username || !req.body.password || !req.body.email) {
      res.status(400).send({
        message: 'Bad request',
        error: 'Missing field'
      })
    } else {
      res.status(500).send({
        message: 'Internal server error',
        error: err
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
      // Will need password verification here later
      if (req.body.password === user.password) {
        let token = authService.signInUser(user); // <--- Generates token
        res.cookie('jwt', token, {httpOnly: true, sameSite: true}); // <--- Sets cookie from token to send to client. httpOnly indicates the cookie cannot be accessed via JS, but only http.
        // Will need https implementation for security
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
    console.log(err)
    res.status(500).send({
      message: 'Internal server error',
      error: err
    })
  })
});

/* GET users listing. */
router.get('/id/:id', function(req, res, next) {
  models.users.findOne({
    where: {
      uid: req.params.id
    },
    attributes: [
      'username',
      'firstName',
      'lastName',
      'bio',
      'areaOfStudy',
      'uid',
      'email'
    ]
    })
    .then( user => {
      if (user) {
        res.status(200).send({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            bio: user.bio,
            areaOfStudy: user.areaOfStudy,
            // gender: user.gender,
            // dateOfBirth: user.dateOfBirth,
            userId: user.uid
        });
      } else {
        res.status(204).send();
      }
    })
    .catch( err => {
      res.status(500).send({
        error: err
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
          uid: decoded.userId,
          username: decoded.username
        }
      })
      .then(user => {
        res.status(200).send({
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          areaOfStudy: user.areaOfStudy,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          userId: user.uid
        })
      })
      .catch( err => {
        res.status(500).send({
          error: err
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
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          bio: req.body.bio,
          areaOfStudy: req.body.areaOfStudy,
          gender: req.body.gender,
          dateOfBirth: req.body.dateOfBirth
        }, 
        { where: { 
            uid: decoded.userId,
            username: decoded.username
      }})
      .then(user =>{
        res.status(200).send({
          message: "Profile info updated"
        })
      })
      .catch(err => {
        res.status(500).send({
          message: "Internal server error",
          error: err
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
