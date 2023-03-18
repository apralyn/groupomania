"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //hard coded data 
    await queryInterface.bulkInsert(
      "groupUsers",
      [
        {
          email: "hello@world.com",
          password: "hello",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('groupUsers', null, {});
  },
};
