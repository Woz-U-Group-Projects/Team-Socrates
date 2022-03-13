'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  groups.init({
    groupId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
  }, {
    sequelize,
    modelName: 'groups',
  });
  return groups;
};