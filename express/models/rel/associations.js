

module.exports = (models) => {
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
models.users.hasMany(models.userNotifications, {
  foreignKey: {
    name: 'recipientId',
    allowNull: false,
  }
});
models.userNotifications.belongsTo(models.users, {
  as: 'recipient',
  foreignKEy: {
    name: 'recipientId',
    allowNull: false,
  }
});
}
