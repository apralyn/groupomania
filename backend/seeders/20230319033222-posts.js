'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Posts', [{
    title: 'FunnyCat',
    description:'funny cat face',
    imageUrl: 'cat.jpg',
    usersLiked:['hello'],
    userId:'userOne',
    createdAt: new Date(),
    updatedAt: new Date()
   }]);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Posts', null,{})
  }
};
