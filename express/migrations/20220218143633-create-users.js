'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      uid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50),
        defaultValue: ""
      },
      lastName: {
        type: Sequelize.STRING(50),
        defaultValue: ""
      },
      email: {
        type: Sequelize.STRING(254),
        unique: true,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING(1),
        defaultValue: "u"
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        defaultValue: null
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      areaOfStudy: {
        type: Sequelize.STRING(100),
        defaultValue: ""
      },
      bio: {
        type: Sequelize.STRING(500),
        defaultValue: ""
      },
      username: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};