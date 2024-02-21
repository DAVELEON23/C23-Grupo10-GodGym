'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Metodo_de_Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.product_users, { 
        as:"Roles",
        foreignKey:"id_producto_usuario",
        });
    }
  }
  Metodo_de_Pago.init({
    pago: DataTypes.ENUMS,
    fechaDePago:DataTypes.DATE,
    monto:DataTypes.INTEGER,
    id_producto_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Metodo_de_Pago',
  });
  return Metodo_de_Pago;
};