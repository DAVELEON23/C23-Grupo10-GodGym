'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*this.hasMany(models.user, { 
        as:"User",
        foreignKey:"id_usuario",
        });
    }
  }
  Adress.init({
    localidad: DataTypes.STRING,
    calle: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Adress',
  });
  return Adress;
};