const models = require ('./models');
const authService = require('./services/auth');

models.sequelize.sync().then(async function() { 
  try {

    //Init Users
    await models.users.bulkCreate([
      {username: "admin1", password: authService.hashPassword('Password1!'), email: "admin@email.com", screenName: "BestAdmin", admin: true},
      {username: "testuser", password: authService.hashPassword('monkey'), email: "email@email.com", screenName: "TestUser",},
      {username: "B.baggins", password: authService.hashPassword('onering'), email: "bilbo@theshire.net", screenName: "TheHobbit",},
      {username: "DJohnson", password: authService.hashPassword('Wrestlemania'), email: "d.johnson@aol.com", screenName: "TheRock",},
      {username: "Einstein", password: authService.hashPassword('E=MC^2'), email: "", screenName: "IntelligenceIsRelative",},
    ])

    //Init Forums
    await models.categories.bulkCreate([
      {name: "Test Forum"},
      {name: "Introductions"},
      {name: "General Discussion"}
    ])
    await models.threads.bulkCreate([
      {categoryId: "1", authorId: "1", subject: "Test Thread"},
      {categoryId: "1", authorId: "1", subject: "Test Test Thread"},
      {categoryId: "2", authorId: "3", subject: "Hello"},
      {categoryId: "3", authorId: "1", subject: "Lorem Ipsum"},
    ])
    await models.posts.bulkCreate([
      {threadId: 1, authorId: 2, threadStarter: true, body: "This is a Test thread, please ignore"},
      {threadId: 2, authorId: 2, threadStarter: true, body: "This is a TestTest thread, please ignore"},
      {threadId: 3, authorId: 3, threadStarter: true, body: "Hello world!"},
      {threadId: 3, authorId: 5, threadStarter: false, body: "Greetings."},
      {threadId: 4, authorId: 1, threadStarter: true, body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    ])
    await models.friendRequests.bulkCreate([
      {fromUser: 3, toUser: 5,},
      {fromUser: 3, toUser: 4,},
      {fromUser: 3, toUser: 1,},
      {fromUser: 3, toUser: 2,},
    ])
    await models.mutualFriendships.bulkCreate([
      {userId: 5, friendId: 3},
      {userId: 3, friendId: 5},
    ])
    console.log('\x1b[32m%s\x1b[0m', 'Test Database populated');
  }
  catch {
    console.error(err);
  }
  }); 