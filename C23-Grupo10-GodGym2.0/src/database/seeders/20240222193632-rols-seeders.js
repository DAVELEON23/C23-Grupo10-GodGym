'use strict';
// const bcrypt = require ("bcrypt");

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
        roles: 'Afiliado',
        createdAt: new Date,
        updatedAt: new Date,
        },], {});
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('People', null, {});
  }
};
