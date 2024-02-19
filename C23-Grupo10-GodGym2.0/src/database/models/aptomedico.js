'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aptomedico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Aptomedico.init({
    apto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aptomedico',
  });
  return Aptomedico;
};