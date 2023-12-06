const express = require('express');
const router = express.Router();
const {registro,login} = require('../controllers/usersController')

/* GET users listing. */

router
.get('/register', registro)
.get('/login', login)

module.exports = router;
