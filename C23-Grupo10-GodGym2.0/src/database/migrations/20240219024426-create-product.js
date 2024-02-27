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
        type: Sequelize.STRING,
        allowNull: false,
      },
      horario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      precio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cupos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      imagen_id: {
        type: Sequelize.INTEGER,
        references:{
        model:{
          tableName:"imagens"
        },
        key:"id"
        },
        allowNull: false,
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