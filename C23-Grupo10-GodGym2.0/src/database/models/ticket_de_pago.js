'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket_de_Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product_user, { 
        as:"Product_users",
        foreignKey:"id_producto_usuario",
        });
    }
  }
  Ticket_de_Pago.init({
    pago: DataTypes.STRING,
    fechaDePago:DataTypes.DATE,
    monto:DataTypes.INTEGER,
    id_producto_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket_de_Pago',
  });
  return Ticket_de_Pago;
};