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
      // define association here
    }
  }
  Metodo_de_Pago.init({
    efectivo: DataTypes.INTEGER,
    debito: DataTypes.INTEGER,
    credito: DataTypes.INTEGER,
    id_producto_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Metodo_de_Pago',
  });
  return Metodo_de_Pago;
};