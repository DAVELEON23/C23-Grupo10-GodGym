'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.hasOne(models.roles, { 
        as:"Roles",
        foreignKey:"id_roles",
        });
      this.hasOne(models.adress, { 
        as:"Adress",
        foreignKey:"id_usuario",
        });
        this.belongsToMany(models.product, { 
          as:"Product",
          through:"product_user",
          foreignKey:"id_usuario",
          otherKey:"id_producto",
          
          });
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fecha_de_nacimiento: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    aptoMedico:DataTypes.BOOLEAN,
    id_roles: DataTypes.INTEGER,
    id_apto_medico: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};