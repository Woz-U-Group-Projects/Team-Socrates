module.exports = (models) => {
  
  // 1 : n User Posts
  models.users.hasMany(models.posts, {
    foreignKey: {
    name: 'authorId',
    allowNull: false,
  }
});
  models.posts.belongsTo(models.users, {
    as: 'author',
    foreignKey: {
    name: 'authorId',
    allowNull: false,
  }
});
  // 1 : n User Threads
  models.users.hasMany(models.threads, {
    foreignKey: {
      name: 'authorId',
      allowNull: false,
  }
});
  models.threads.belongsTo(models.users, {
    as: 'author',
    foreignKey: {
      name: 'authorId',
      allowNull: false,
  }
});
  // 1 : n Threads Posts
  models.threads.hasMany(models.posts, {
    foreignKey: {
      name: 'threadId',
      allowNull: false,
  }
});
  models.posts.belongsTo(models.threads, {
    foreignKey: {
      name: 'threadId',
      allowNull: false,
  }
});
  // 1 : n Categories Threads
  models.categories.hasMany(models.threads, {
    foreignKey: {
      name: 'categoryId',
      allowNull: false,
  }
});
  models.threads.belongsTo(models.categories, {
    foreignKey: {
      name: 'categoryId',
      allowNull: false,
  }
});
  // double 1 : n User Friendships
  models.users.hasMany(models.mutualFriendships, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
  }
});
  models.mutualFriendships.belongsTo(models.users, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
  }
});
  models.users.hasMany(models.mutualFriendships, {
    foreignKey: {
      name: 'friendId',
      allowNull: false,
}
});
  models.mutualFriendships.belongsTo(models.users, {
    as: 'friend',
    foreignKey: {
      name: 'friendId',
      allowNull: false,
  }
});

// double 1 : n Friend Requests
models.users.hasMany(models.friendRequests, {
  foreignKey: {
    name: 'fromUser',
    allowNull: false,
}
});
models.friendRequests.belongsTo(models.users, {
  as: 'sender',
  foreignKey: {
    name: 'fromUser',
    allowNull: false,
}
});
models.users.hasMany(models.friendRequests, {
  foreignKey: {
    name: 'toUser',
    allowNull: false,
}
});
models.friendRequests.belongsTo(models.users, {
  as: 'receiver',
  foreignKey: {
    name: 'toUser',
    allowNull: false,
}
});
// n : m Follower & Following + userFollows aliases
models.users.belongsToMany(models.users, {through: 'userFollows', as: 'follower', foreignKey: 'followerId'});
models.users.belongsToMany(models.users, {through: 'userFollows', as: 'following', foreignKey: 'followingId'});
models.userFollows.belongsTo(models.users, {
  foreignKey: 'followerId',
  as: 'follower',
  allowNull: false,
});
models.userFollows.belongsTo(models.users, {
  foreignKey: 'followingId',
  as: 'following',
  allowNull: false,
});

// 1 : n Actor to Global Notifications
models.users.hasMany(models.globalNotifications, {
  foreignKey: {
    name: 'actorId',
    allowNull: false,
  }
});
models.globalNotifications.belongsTo(models.users, {
  as: 'actor',
  foreignKey: {
    name: 'actorId',
    allowNull: false,
  }
});
// 1 : n Global Notifications to User Notifications
models.globalNotifications.hasMany(models.userNotifications, {
  foreignKey: {
    name: 'notificationId',
    allowNull: false,
  }
});
models.userNotifications.belongsTo(models.globalNotifications, {
  foreignKey: {
    name: 'notificationId',
    allowNull: false,
  }
});
// 1 : n Users to User Notifications
models.users.hasMany(models.userNotifications, {
  foreignKey: {
    name: 'recipientId',
    allowNull: false,
  }
});
models.userNotifications.belongsTo(models.users, {
  as: 'recipient',
  foreignKey: {
    name: 'recipientId',
    allowNull: false,
  }
});
}
