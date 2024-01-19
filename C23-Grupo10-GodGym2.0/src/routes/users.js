const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login,processLogin} = require('../controllers/usersController')

/* GET users listing. */

router
.get('/register', viewRegister)
.post('/register', createRegister)
.get('/login', login)
.post('/login', processLogin)

module.exports = router;
