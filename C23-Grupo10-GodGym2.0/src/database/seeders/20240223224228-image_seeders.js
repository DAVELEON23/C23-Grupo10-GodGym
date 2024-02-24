'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('imagens', [{
        nombre: 'default.webp',
        path:'/images/default.webp',
        extension:'webp',
        createdAt: new Date,
        updatedAt: new Date
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('imagens', null, {});
     
  }
};
