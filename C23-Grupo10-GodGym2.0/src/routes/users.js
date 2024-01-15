const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login} = require('../controllers/usersController')
const { body } = require("express-validator")


// validacionces de registro.
const validationRegister = [
    body("nombre").notEmpty().withMessage("ingresa un nombre").bail(),
    body("apellido").notEmpty().withMessage("ingresa un nombre").bail(),
    body("fecha").notEmpty().withMessage("ingresa un nombre").bail(),
    body("email").notEmpty().withMessage("ingresa un nombre").bail(),
    body("contraseña").notEmpty().withMessage("ingresa un nombre").bail()

]


/* GET users listing. */

router
.get('/register', viewRegister)

.post('/register', validationRegister ,createRegister)

.get('/login', login)

module.exports = router;
 