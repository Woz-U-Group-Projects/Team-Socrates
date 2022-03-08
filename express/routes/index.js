const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");


router.get('/', function(req, res, next) {
  res.send({routes: {
    signup: "POST /users",
    login: "POST /users/login",
    findAllUsers: "GET /users",
    findUserInfo: "GET /users/id/:id",
    accessPersonalProfile: "GET /users/profile",
    changePersonalProfile: "PUT /users/profile",
    getForumCategories: "GET /forum",
    getThreadsInCategory: "GET /forum/:nameOrIdOfCategory",
    postThreadInCategory: "POST /forum/:nameOrIdOfCategory",
    getThread: "GET /forum/threads/:id",
    postReplyInThread: "POST /forum/threads/:id",
  }});
});

module.exports = router;