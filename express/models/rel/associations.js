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
  // 1 : n Author to Threads
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
  // m : n Subscribers to Threads
  models.users.belongsToMany(models.threads, {through: 'threadSubscriptions', as: 'subscribedThreads', foreignKey: 'subscriberId'});
  models.threads.belongsToMany(models.users, {through: 'threadSubscriptions', as: 'subscribers', foreignKey: 'threadId'});
  
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
models.users.belongsToMany(models.users, {through: 'userFollows', as: 'followers', foreignKey: 'followingId'});
models.users.belongsToMany(models.users, {through: 'userFollows', as: 'following', foreignKey: 'followerId'});
models.userFollows.belongsTo(models.users, {
  as: 'followers',
  foreignKey: {
    name: 'followerId',
    allowNull: false,
  }
});
models.userFollows.belongsTo(models.users, {
  as: 'following',
  foreignKey: {
    name: 'followingId',
    allowNull: false,
  }
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
  // m : n Members to Groups
  models.users.belongsToMany(models.groups, {through: 'groupMembers', as: 'groups', foreignKey: 'userId'});
  models.groups.belongsToMany(models.users, {through: 'groupMembers', as: 'members', foreignKey: 'threadId'});
  // 1 : n Group to Posts
  models.groups.hasMany(models.groupPosts, {foreignKey: {name: 'groupId', allowNull: false}, as: 'groupPosts'});
  models.groupPosts.belongsTo(models.groups, {foreignKey: {name: 'groupId', allowNull: false}});
  // 1 : n User to Group Posts
  models.users.hasMany(models.groupPosts, {foreignKey: {name: 'authorId', allowNull: false}, as: 'groupPosts'});
  models.groupPosts.belongsTo(models.users, {foreignKey: {name: 'authorId', allowNull: false}, as: 'author'});
}

