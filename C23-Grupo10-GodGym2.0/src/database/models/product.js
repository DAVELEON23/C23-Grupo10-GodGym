'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.imagen, { 
        as:"Imagen",
        foreignKey:"id",
        });
        this.belongsToMany(models.user, { 
          as:"User",
          through:"product_user",
          foreignKey:"id_producto",
          otherKey:"id_usuario",
          });
    }
  }
  Product.init({
    actividad: DataTypes.STRING,
    horario: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    cupos: DataTypes.INTEGER,
    imagen_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};