//const db = require ("../database/models")
const {body} = require("express-validator");


const validationPerfil = [
    body("nombre").notEmpty().withMessage('Por favor complete este campo').bail()
        .isLength({min:3,max:20}).withMessage('Debe ingresar entre tres y 20 caracteres').bail(),

    body("apellido").notEmpty().withMessage('Por favor complete este campo').bail()
    .isLength({min:3,max:20}).withMessage('Debe ingresar entre tres y 20 caracteres').bail(),

    body("fecha_de_nacimiento").notEmpty().withMessage('Por favor complete este campo').bail()
        .custom(value => {
            return !isNaN(Date.parse(value))
        }).withMessage('Ingrese una fecha valida').bail(),
        
    
]

module.exports = validationPerfil;