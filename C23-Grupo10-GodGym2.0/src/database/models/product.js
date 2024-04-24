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
          
          this.belongsTo(models.Category, {
            as: "Category",
            foreignKey: "id_category"
          });

        this.belongsToMany(models.User, { 
          as:"User",
          through:"Product_user",
          foreignKey:"id_producto",
          otherKey:"id_usuario",
          });
        
    }
  }
  Product.init({
    actividad: DataTypes.STRING,
    horario: DataTypes.STRING,
    informacion:DataTypes.STRING,
    precio: DataTypes.INTEGER,
    cupos: DataTypes.INTEGER,
    imagen: DataTypes.INTEGER,
    id_category:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};