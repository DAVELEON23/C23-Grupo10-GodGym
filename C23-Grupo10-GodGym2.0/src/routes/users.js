const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login,UserEditView,edit, processLogin, viewPerfil, logout} = require('../controllers/usersController')

const accountValidate = require('../middlewares/accountValidate')

const validationRegister = require('../validaciones/validationRegister')
/* GET users listing. */

router
.get('/register', viewRegister)

.post('/register',validationRegister,createRegister)

.get('/login', login)
.post('/login', processLogin)

.get("/edit/:id",UserEditView)
.put("/edit/:id", edit )

.get("/perfil/:id",accountValidate, viewPerfil)
.get('/logout', logout)

module.exports = router;