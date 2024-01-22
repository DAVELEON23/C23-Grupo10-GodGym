const {body} = require("express-validator");
const{getJson} = require("../utility/jsonMethod");
const bcrypt = require("bcrypt");
const users = getJson("Users");

module.exports = [
    body("email").notEmpty().withMessage("Debes completar el E-mail").bail()
    .isEmail().withMessage("Debes ingresar un formato valido para Email").bail()
    .custom(value =>{
        const user = users.find(user=>user.email == value)
        return user ? true : false 
    }).withMessage("Credenciales invalidas"),

    body("contrasenia").notEmpty().withMessage("Debes ingresar una contraseña valida").bail()
    .custom((value,{req}) => {
        const user = users.find(user=>user.email == req.body.email)
        
        return bcrypt.compareSync(value,user.contrasenia)
    }).withMessage("Usuario o contraseña incorrecta")

]

