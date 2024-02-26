'use strict';
const {getJson} = require("../../utility/jsonMethod");
const users = getJson("Users");
const data = users.map(user => {
  user.createdAt = new Date;
  user.updatedAt = new Date
  return user;
})

console.log("users:",data)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('users', data, {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  
  }
};

