'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class threadSubscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  threadSubscriptions.init({
    subscriberId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    threadId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'threads', key: 'threadId'},
    },
  }, {
    sequelize,
    modelName: 'threadSubscriptions',
  });
  return threadSubscriptions;
};