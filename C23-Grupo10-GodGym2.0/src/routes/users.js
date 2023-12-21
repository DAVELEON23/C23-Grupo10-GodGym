const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login} = require('../controllers/usersController')

/* GET users listing. */

router
.get('/register', viewRegister)
.post('/register', createRegister)
.get('/login', login)

module.exports = router;
