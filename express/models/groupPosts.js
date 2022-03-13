'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  groupPosts.init({
    postId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'groups', key: 'groupId'},
    },
    body: {
      type: DataTypes.STRING(5000),
    },
    subject: DataTypes.STRING,
    authorId: {
      type: DataTypes.INTEGER,
      references: {model: 'users', key: 'userId'},
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'groupPosts',
  });
  return groupPosts;
};