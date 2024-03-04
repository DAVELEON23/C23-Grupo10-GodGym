'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ticket_de_Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pago: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fechaDePago: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Metodo_de_Pagos');
  }
};