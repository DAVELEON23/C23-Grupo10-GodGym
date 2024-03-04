'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('roles', [{
    roles: 'Admin',
    createdAt: new Date,
    updatedAt:new Date,
    
    },{
      roles: 'Profesor',
      createdAt: new Date,
      updatedAt:new Date,
      },{
        roles: 'User',
        createdAt: new Date,
        updatedAt: new Date,
        },], {});
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('People', null, {});
  }
};
