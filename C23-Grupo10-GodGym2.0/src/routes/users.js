const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login} = require('../controllers/usersController')
const { body } = require("express-validator")


// validacionces de registro.
const validationRegister = [
    body("nombre").notEmpty().withMessage("ingresa un nombre").bail(),
    body("apellido").notEmpty().withMessage("ingresa un apellido").bail(),
    body("fecha").notEmpty().withMessage("ingresa tu fecha de nacimiento").bail(),
    body("email").notEmpty().withMessage("ingresa un email correcto").bail(),
    body("contraseña").notEmpty().withMessage("ingresa una contraseña").bail()

]


/* GET users listing. */

router
.get('/register', viewRegister)

.post('/register', validationRegister ,createRegister)

.get('/login', login)

module.exports = router;
 