'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Metodo_de_Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pago: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fechaDePago: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      monto: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_producto_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'Product_users'
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
    await queryInterface.dropTable('Ticket_de_Pago');
  }
};