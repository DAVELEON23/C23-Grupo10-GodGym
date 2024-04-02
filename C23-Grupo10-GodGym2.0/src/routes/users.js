const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login,editDashboard,perfilDashboard,edit, processLogin, viewPerfil,userDashboard, logout,userDelete} = require('../controllers/usersController')

const accountValidate = require('../middlewares/accountValidate');
const adminValidate = require('../middlewares/adminValidate'); //
const validationRegister = require('../validaciones/validationRegister');
const validationLogin = require("../validaciones/validationLogin");


<<<<<<< HEAD
const validationRegister = require('../validaciones/validationRegister')
const validationLogin = require("../validaciones/validationLogin")
const validacionPerfil = require('../validaciones/validacionesPerfil')
=======

>>>>>>> 6b7c92554752a05094f31926197d2d76dda00ee3
/* GET users listing. */

router
.get('/register', viewRegister)

.post('/register',validationRegister,createRegister)

.get('/login', login)
.post('/login', validationLogin, processLogin)

.get("/dashboard", adminValidate, userDashboard)            //dash

.get("/editPerfil/:id",adminValidate, perfilDashboard)
.put("/editPerfil/:id", editDashboard)

.get("/perfil/:id",accountValidate, viewPerfil)
.put("/perfil/:id",validacionPerfil ,edit )

.get('/logout', logout)

router.delete('/delete/:id', adminValidate, userDelete);

module.exports = router;