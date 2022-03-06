

module.exports = (models) => {
  models.users.hasMany(models.posts, {
    foreignKey: {
    name: 'userId',
    allowNull: false,
  }
});
  models.posts.belongsTo(models.users, {
    foreignKey: {
    name: 'userId',
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
}