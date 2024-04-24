const express = require('express');
const router = express.Router();
const {viewRegister,createRegister,login,editDashboard,perfilDashboard,edit, processLogin, viewPerfil,userDashboard, logout,userDelete} = require('../controllers/usersController')

const accountValidate = require('../middlewares/accountValidate');
const adminValidate = require('../middlewares/adminValidate'); //
const validationRegister = require('../validaciones/validationRegister');
const validationLogin = require("../validaciones/validationLogin");
const validacionPerfil = require('../validaciones/validacionesPerfil');
const multer = require('multer');
const path = require("path") 
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,"../../public/images/userImage"))
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}_img_ ${path.extname(file.originalname)}`)
    }
    });
  
    const upload = multer({storage})

/* GET users listing. */

router
.get('/register', viewRegister)

.post('/register',validationRegister,createRegister)

.get('/login', login)
.post('/login', validationLogin, processLogin)

.get("/dashboard", adminValidate, userDashboard)            //dash

.get("/editPerfil/:id",adminValidate, perfilDashboard)
.put("/editPerfil/:id",upload.single("imagen"),editDashboard)

.get("/perfil/:id",accountValidate, viewPerfil)
.put("/perfil/:id",upload.single("imagen"),validacionPerfil,edit )

.get('/logout', logout)

router.delete('/delete/:id', adminValidate, userDelete);

module.exports = router;