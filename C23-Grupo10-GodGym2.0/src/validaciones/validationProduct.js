const {body} = require('express-validator');


const validationProduct = [
    body("actividad")
       .notEmpty()
       .withMessage('Este campo no puede estar vacio')
       .bail()
       .isLength({min:3,max:15})
       .withMessage('Ingresar entre 3 y 15 caracteres')
       .bail(),
    body("imagen")
        .notEmpty()
        .withMessage('Este campo no puede estar vaio')
        .bail(),
    body("horario")
        .notEmpty()
        .withMessage('Este campo no puede estar vaco')
        .bail()
        .isLength({min:3,max:15})
        .withMessage('Ingresar entre 3 y 15 caracteres')
        .bail(),
    body("informacion")
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .bail()
        .isLength({min:20,max:200})
        .withMessage('Ingresar entre 20 y 200 caracteres')
        .bail(),
    body("cupos")
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .bail()
        .isLength({min:1,max:30})
        .withMessage('Ingresar entre 1 y 30 caracteres')
        .bail(),
    body("precio")
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .bail()
    
        

]

module.exports = validationProduct
