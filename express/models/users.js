'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    uid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING(50),
      defaultValue: ""
    },
    lastName: {
      type: DataTypes.STRING(50),
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(254),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      }
    },
    gender: {
      type: DataTypes.STRING(1),
      defaultValue: "u"
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    areaOfStudy: {
      type: DataTypes.STRING(100),
      defaultValue: ""
    },
    bio: {
      type: DataTypes.STRING(500),
      defaultValue: ""
    },
    username: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [6, 30],
          msg: "Username must be between 6 and 30 characters"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};