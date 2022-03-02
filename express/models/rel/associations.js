

module.exports = (models) => {
  models.users.hasMany(models.posts, {
    foreignKey: {
    name: 'userId',
    allowNull: false
  }});
  models.posts.belongsTo(models.users, {
    foreignKey: {
    name: 'userId',
    allowNull: false
  }});
  
  models.users.hasMany(models.threads, {
    foreignKey: {
      name: 'userId',
    allowNull: false
    }
  });
  models.threads.belongsTo(models.users, {
    foreignKey: {
      name: 'userId',
    allowNull: false
    }
  });

  models.threads.hasMany(models.posts, {
    foreignKey: {
      name: 'threadId',
    allowNull: false
    }
  });
  models.posts.belongsTo(models.threads, {
    foreignKey: {
      name: 'threadId',
    allowNull: false
    }
  });
  models.forums.hasMany(models.threads, {
    foreignKey: 'forumId',
    allowNull: false
  });
  models.threads.belongsTo(models.forums, {
    foreignKey: 'forumId',
    allowNull: false
  })
}