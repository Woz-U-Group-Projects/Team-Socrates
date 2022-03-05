'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init({
    postId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    body: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    threadId: {
      type: DataTypes.INTEGER,
      references: {model: 'threads', key: 'threadId'},
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {model: 'users', key: 'userId'},
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    threadStarter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};