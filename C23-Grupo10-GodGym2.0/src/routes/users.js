const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login,UserEditView,edit} = require('../controllers/usersController')

/* GET users listing. */

router
.get('/register', viewRegister)
.post('/register', createRegister)
.get('/login', login)

.get("/edit/:id",UserEditView)
.put("/edit/:id", edit )

module.exports = router;
