module.exports = (models) => {
  models.users.hasMany(models.posts, {
    foreignKey: {
    name: 'uid',
    allowNull: false
  }});
  models.posts.belongsTo(models.users, {
    foreignKey: {
    name: 'uid',
    allowNull: false
  }});
  
  models.users.hasMany(models.threads, {
    foreignKey: {
      name: 'uid',
    allowNull: false
    }
  });
  models.threads.belongsTo(models.users, {
    foreignKey: {
      name: 'uid',
    allowNull: false
    }
  });

  models.threads.hasMany(models.posts, {
    foreignKey: {
      name: 'tid',
    allowNull: false
    }
  });
  models.posts.belongsTo(models.threads, {
    foreignKey: {
      name: 'tid',
    allowNull: false
    }
  });
}