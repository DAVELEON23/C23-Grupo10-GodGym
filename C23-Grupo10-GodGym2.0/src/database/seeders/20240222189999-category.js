'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert('Categories', [{
  name: 'cardio',
  createdAt: new Date,
  updatedAt:new Date,
  },{
    name: 'aerobicos',
    createdAt: new Date,
    updatedAt:new Date,
    },{
      name: 'fuerza',
      createdAt: new Date,
      updatedAt: new Date,
      },{
        name: 'resistencia',
        createdAt: new Date,
        updatedAt:new Date,
        },{
          name: 'deportes',
          createdAt: new Date,
          updatedAt:new Date,
          },{
            name: 'flexibilidad',
            createdAt: new Date,
            updatedAt:new Date,
            },], {});
  
},

async down (queryInterface, Sequelize) {

  await queryInterface.bulkDelete('Categories', null, {});
}
};