'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      direccion:{
        type:Sequelize.STRING,
        allowNull: true,
      },
      cp:{
        type:Sequelize.INTEGER,
        allowNull: true,
      },
      fecha_de_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique:true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      aptoMedico: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      id_roles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'Roles'
          },
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
    await queryInterface.dropTable('Users');
  }
};