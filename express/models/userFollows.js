'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userFollows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userFollows.init({
    followerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    followingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    }, {
    sequelize,
    modelName: 'userFollows',
    name: {
      singular: 'userFollow',
      plural: 'userFollows'
    },
  });
  return userFollows;
};