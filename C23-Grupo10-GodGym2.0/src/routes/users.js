const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login,UserEditView,edit, processLogin} = require('../controllers/usersController')
const validationRegister = require('../validaciones/validationRegister')


/* GET users listing. */

router
.get('/register', viewRegister)

.post('/register',validationRegister,createRegister)

.get('/login', login)
.post('/login', processLogin)

.get("/edit/:id",UserEditView)
.put("/edit/:id", edit )

module.exports = router;