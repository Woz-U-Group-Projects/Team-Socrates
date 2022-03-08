'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mutualFriendships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mutualFriendships.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    friendId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {model: 'users', key: 'userId'},
    },
    }, {
    sequelize,
    modelName: 'mutualFriendships',
    name: {
      singular: 'mutualFriendship',
      plural: 'mutualFriendships'
    },
  });
  return mutualFriendships;
};