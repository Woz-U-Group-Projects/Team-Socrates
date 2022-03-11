'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class globalNotifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  globalNotifications.init({
    notificationId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    // Define foreign key of user who caused the notification
    actorId: {
      type: DataTypes.INTEGER,
      references: {model: 'users', key: 'userId'},
      allowNull: false,
    },
    entityActionType: { // <- Gives information about what specific action created the global notification, and what table  entityId should point to.
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
   // Point to PK on another table
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'globalNotifications',
    name: {
      singular: 'globalNotification',
      plural: 'globalNotifications'
    },
    paranoid: true,
  });
  return globalNotifications;
};