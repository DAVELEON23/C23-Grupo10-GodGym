'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      actividad: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      horario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      informacion:{
        type:Sequelize.STRING(1000),
        allowNull: false,
      },
      precio: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cupos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      imagen: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      id_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{tableName:'Categories'},
          key:"id"
          },
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
    await queryInterface.dropTable('Products');
  }
};