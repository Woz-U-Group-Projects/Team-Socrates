const express = require("express");
const router = express.Router();
const models = require("../models");
const authService = require("../services/auth");
const { Op } = require("sequelize");
const notificationGenService = require("../services/notificationGen");

//GET Incoming Friend Requests
router.get("/friends/incomingRequests", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    try {
      const incomingRequests = await models.friendRequests.findAll({
        where: { toUser: auth.decoded.userId },
        include: [
          {
            model: models.users,
            as: "sender",
            attributes: ["screenName", "profilePic", "firstName", "lastName"],
          },
        ],
      });
      res.send(incomingRequests);
    } catch {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
});

//GET Outgoing Sent Friend Requests
router.get("/friends/pendingRequests", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const pendingRequests = await models.friendRequests.findAll({
      where: { fromUser: auth.decoded.userId },
      include: [
        {
          model: models.users,
          as: "receiver",
          attributes: ["screenName", "profilePic", "firstName", "lastName"],
        },
      ],
    });
    res.send(pendingRequests);
  }
});

//POST Send Friend Request
router.post("/friends/newRequest/:id", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const existingRequest = await models.friendRequests.findOne({
      where: {
        [Op.and]: [
          { fromUser: { [Op.or]: [auth.decoded.userId, req.params.id] } },
          { toUser: { [Op.or]: [auth.decoded.userId, req.params.id] } },
        ],
      },
    });

    if (existingRequest) {
      res.status(400).send({ existingRequest });
    } else {
      const existingFriend = await models.mutualFriendships.findOne({
        where: { userId: auth.decoded.userId, friendId: req.params.id },
      });
      if (existingFriend) {
        res.status(400).send({ message: "That user is already friended." });
      } else {
        const newRequest = await models.friendRequests.create({
          fromUser: auth.decoded.userId,
          toUser: parseInt(req.params.id),
        });
        res.status(201).send(newRequest);
        notificationGenService.generate(newRequest, 1);
      }
    }
  }
});
//PUT Accept Friend Request
router.put("/friends/incomingRequests/:id", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const requestToAccept = await models.friendRequests.findOne({
      where: { toUser: auth.decoded.userId, fromUser: req.params.id },
    });
    if (!requestToAccept) {
      res.status(400).send({ message: "No friend request found." });
    } else {
      const newFriend = await models.mutualFriendships.create({
        userId: auth.decoded.userId,
        friendId: requestToAccept.fromUser,
      });
      await models.mutualFriendships.create({
        userId: requestToAccept.fromUser,
        friendId: auth.decoded.userId,
      });
      await requestToAccept.destroy();
      notificationGenService.generate(newFriend, 2);
      res.status(200).send({ message: "Friend accepted." });
    }
  }
});
//DELETE Reject Friend Request
router.delete("/friends/incomingRequests/:id", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const rejectedRequest = await models.friendRequests.findOne({
      where: { toUser: auth.decoded.userId, fromUser: req.params.id },
    });
    if (!rejectedRequest) {
      res.status(400).send({ message: "No friend request found." });
    } else {
      await rejectedRequest.destroy();
      res.status(200).send({ message: "Request rejected." });
    }
  }
});

//DELETE Cancel Sent Friend Request
router.delete("/friends/pendingRequests/:id", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const rescindedRequest = await models.friendRequests.findOne({
      where: { fromUser: auth.decoded.userId, toUser: req.params.id },
    });
    if (!rescindedRequest) {
      res.status(400).send({ message: "No friend request found." });
    } else {
      await rescindedRequest.destroy();
      res.status(200).send({ message: "Request rescinded." });
    }
  }
});

//GET Your friend list
router.get("/friends", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const friendsList = await models.mutualFriendships.findAll({
      where: { userId: auth.decoded.userId },
      attributes: ["friendId", "createdAt"],
      include: [
        {
          model: models.users,
          as: "friend",
          attributes: ["screenName", "profilePic", "firstName", "lastName"],
        },
      ],
    });
    res.status(200).send(friendsList);
  }
});

//DELETE Unfriend
router.delete("/friends/:id", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const unfriend = await models.mutualFriendships.findOne({
      where: { userId: auth.decoded.userId, friendId: req.params.id },
    });
    const unfriend2 = await models.mutualFriendships.findOne({
      where: { friendId: auth.decoded.userId, userId: req.params.id },
    });
    if (!unfriend) {
      res.status(400).send({ message: "Friendship doesn't exist" });
    } else {
      await unfriend.destroy();
      await unfriend2.destroy();
      res.status(200).send({ message: "User unfriended" });
    }
  }
});

// Get Followers
router.get("/followers", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const followers = await models.userFollows.findAll({
      where: { followingId: auth.decoded.userId },
      include: [
        {
          model: models.users,
          as: "followers",
          attributes: ["screenName", "firstName", "lastName", "profilePic"],
        },
      ],
      attributes: ["followerId"],
    });
    res.status(200).send(followers);
  }
});

// Get Following
router.get("/following", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    const following = await models.userFollows.findAll({
      where: { followerId: auth.decoded.userId },
      include: [
        {
          model: models.users,
          as: "following",
          attributes: ["screenName", "firstName", "lastName", "profilePic"],
        },
      ],
      attributes: ["followingId"],
    });
    res.status(200).send(following);
  }
});
// New Follower
router.post("/following/:id", function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else if (req.params.id === auth.decoded.userId) {
    res.status(400).send({ message: "You cannot follow yourself!" });
  } else {
    models.userFollows
      .findOrCreate({
        where: {
          followerId: auth.decoded.userId,
          followingId: parseInt(req.params.id),
        },
      })
      .then(([userFollows, created]) => {
        if (created) {
          res.status(200).send(userFollows);
        } else {
          res.status(409).send({ message: "You already follow that user." });
        }
      });
  }
});
// Unfollow
router.delete("/following/:id", async function (req, res, next) {
  const auth = res.locals.auth;
  if (!auth.loggedIn) {
    res.status(401).send({ message: auth.message });
  } else {
    await models.userFollows.delete({
      where: { followerId: auth.decoded.userId, followingId: req.params.id },
    });
    res.status(204).send();
  }
});
module.exports = router;
