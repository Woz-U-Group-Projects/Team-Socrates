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
    tid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    subject: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'threads',
  });
  return threads;
};