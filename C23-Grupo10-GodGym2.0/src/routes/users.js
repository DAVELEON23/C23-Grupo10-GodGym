const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login,UserEditView,edit, processLogin, viewPerfil, logout} = require('../controllers/usersController')

const accountValidate = require('../middlewares/accountValidate')

const validationRegister = require('../validaciones/validationRegister')
const validationLogin = require("../validaciones/validationLogin")

/* GET users listing. */

router
.get('/register', viewRegister)

.post('/register',validationRegister,createRegister)

.get('/login', login)
.post('/login', validationLogin, processLogin)

.get("/perfil/:id",accountValidate, viewPerfil)
.put("/perfil/:id", edit )

.get('/logout', logout)

module.exports = router;