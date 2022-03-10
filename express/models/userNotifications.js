'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userNotifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userNotifications.init({
    notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'globalNotifications', key: 'notificationId'},
    },
    recipientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    readStatus: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'userNotifications',
    name: {
      singular: 'userNotification',
      plural: 'userNotifications'
    },
    paranoid: true,
  });
  return userNotifications;
};