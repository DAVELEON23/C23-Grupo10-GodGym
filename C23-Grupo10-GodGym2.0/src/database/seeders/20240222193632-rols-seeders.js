'use strict';
const jsonMethod = require('./utility/jsonMethod');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('roles', [{
    name: 'Admin',
    isBetaMember: false
    },{
      name: 'Profesor',
      createdAt: new Date,
      updatedAt:new Date,
      },{
        name: 'User',
        createdAt: new Date,
        updatedAt: new Date,
        },], {});
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('People', null, {});
  }
};
