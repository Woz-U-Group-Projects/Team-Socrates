'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class threads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  threads.init({
    threadId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {model: 'categories', key: 'categoryId'},
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(50),
      defaultValue: "New Thread",
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {model: 'users', key: 'userId'},
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastBumped: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'threads',
    paranoid: true,
  });
  return threads;
};