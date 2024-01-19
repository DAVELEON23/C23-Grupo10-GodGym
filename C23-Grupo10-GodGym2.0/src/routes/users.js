const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login} = require('../controllers/usersController')
const { body } = require("express-validator")


// validacionces de registro.
const validationRegister = [
    body("nombre").notEmpty().withMessage("ingresa un nombre").bail()
        .isLength({min:3,max:25}).withMessage("Ingresa un minimo de 3 caracteres y un maximo de 25").bail(),
    body("apellido").notEmpty().withMessage("ingresa un apellido").bail()
    .isLength({min:3,max:25}).withMessage("Ingresa un minimo de 3 caracteres y un maximo de 25").bail(),
    body("fecha").notEmpty().withMessage("ingresa tu fecha de nacimiento").bail(),
    body("email").notEmpty().withMessage("ingresa el email").bail()
        .isEmail().withMessage("Debes imgresar un formato de correo valido").bail(),
        
    body("contrasenia").notEmpty().withMessage("ingresa una contraseña").bail()

]


/* GET users listing. */

router
.get('/register', viewRegister)

.post('/register', validationRegister ,createRegister)

.get('/login', login)

module.exports = router;
 