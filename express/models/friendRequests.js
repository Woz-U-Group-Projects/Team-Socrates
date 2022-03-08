'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friendRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  friendRequests.init({
    requestId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    fromUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    toUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    }, {
    sequelize,
    modelName: 'friendRequests',
    name: {
      singular: 'friendRequest',
      plural: 'friendRequests'
    },
    validate: {
      diffUsers() {
        if ((this.fromUser === this.toUser)) {
          throw new Error('A user cannot send a friend request to themselves!');
        }
      }
    }
  });
  return friendRequests;
};