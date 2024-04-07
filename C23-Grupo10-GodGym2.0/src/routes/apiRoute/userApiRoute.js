const express = require('express');
const router = express.Router();
const {all,userId,} = require('../../controllers/apiController/userApiController')

// const accountValidate = require('../middlewares/accountValidate')

// const validationRegister = require('../validaciones/validationRegister')
// const validationLogin = require("../validaciones/validationLogin")


router
.get('/allusers', all)
.get('/user/:id', userId)

// .delete('/user/:id', destroy)
// .post('/create',validationProduct,create)
// .put("/perfil/:id", validationProduct, edit)

module.exports = router;

