const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login,editDashboard,perfilDashboard,edit, processLogin, viewPerfil,userDashboard, logout} = require('../controllers/usersController')

const accountValidate = require('../middlewares/accountValidate');
const adminValidate = require('../middlewares/adminValidate'); //
const validationRegister = require('../validaciones/validationRegister');
const validationLogin = require("../validaciones/validationLogin");



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
.put("/perfil/:id", edit )

.get('/logout', logout)

module.exports = router;