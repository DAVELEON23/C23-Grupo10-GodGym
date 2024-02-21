'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.metodo_de_pago, { 
        as:'Metodo_de_Pago',
        foreignKey:"id_producto_usuario",
        });
    }
  }
  Product_user.init({
    id_usuario: DataTypes.INTEGER,
    id_producto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_user',
  });
  return Product_user;
};