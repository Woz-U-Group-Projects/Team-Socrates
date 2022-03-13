'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  groupMembers.init({
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'groups', key: 'groupId'},
    },
    memberId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    muted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    moderator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'groupMembers',
  });
  return groupMembers;
};