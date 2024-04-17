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
      
      this.hasOne(models.Roles, { 
        as:"Roles",
        foreignKey:"id_roles",
        });
        this.belongsToMany(models.Product, { 
          as:"Product",
          through:"Product_user",
          foreignKey:"id_usuario",
          otherKey:"id_producto",
          
          });
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    direccion:DataTypes.STRING,
    cp: DataTypes.INTEGER,
    fecha_de_nacimiento: DataTypes.DATEONLY,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imagen:DataTypes.STRING,
    aptoMedico:DataTypes.STRING,
    id_roles: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};