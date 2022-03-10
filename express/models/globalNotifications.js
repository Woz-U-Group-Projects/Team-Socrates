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
    actorId: {
      type: DataTypes.INTEGER,
      references: {model: 'users', key: 'userId'},
    },
    entityType: DataTypes.INTEGER,
    entityId: DataTypes.INTEGER,
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