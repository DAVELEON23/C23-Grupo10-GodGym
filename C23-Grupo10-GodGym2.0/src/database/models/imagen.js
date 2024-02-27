'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, { 
        as:"Product",
        foreignKey:"imagen_id",
        });
    }
  }
  Imagen.init({
    nombre: DataTypes.STRING,
    path: DataTypes.STRING,
    extension: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Imagen',
  });
  return Imagen;
};