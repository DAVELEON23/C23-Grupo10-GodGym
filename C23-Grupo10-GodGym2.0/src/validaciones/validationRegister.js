const { isDate } = require("util/types");
const {getJson} = require("../utility/jsonMethod");
const {body} = require("express-validator");
const users = getJson("users");

const validationRegister = [
    body("nombre").notEmpty().withMessage('Por favor complete este campo').bail()
        .isLength({min:3,max:20}).withMessage('Debe ingresar entre tres y 20 caracteres').bail(),

    body("apellido").notEmpty().withMessage('Por favor complete este campo').bail()
    .isLength({min:3,max:20}).withMessage('Debe ingresar entre tres y 20 caracteres').bail(),

    body("fecha").notEmpty().withMessage('Por favor complete este campo').bail()
        .custom(value => {
            return !isNaN(Date.parse(value))
        }).withMessage('Ingrese una fecha valida').bail(),
        
    body("email").notEmpty().withMessage('Por favor complete este campo').bail()
        .isEmail().withMessage('Debe ingresar un formato de correo valido').bail()
        .custom(value => {
            const usuario = users.find(usuario => usuario.email == value);
            return usuario ? false : true;
        }).withMessage('El email ya existe , por favor elija otro'),
        
    body("contrasenia").notEmpty().withMessage('Por favor complete este campo').bail()
        .custom((value,{req}) =>{
            return value == req.body.contrasenia2;
        }).withMessage('las credenciales no coinciden')
        
    
]

module.exports = validationRegister;