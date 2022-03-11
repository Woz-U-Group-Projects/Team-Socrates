const express = require('express');
const router = express.Router();
const models = require ('../models');
const authService = require('../services/auth');
const { Op } = require("sequelize");
const notificationGenService = require('../services/notificationGen');

router.get('/', async function(req, res, next) {
  notificationGenService.globalFilter(1, 1)
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