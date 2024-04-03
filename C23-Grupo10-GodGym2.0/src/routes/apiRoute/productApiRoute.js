const express = require('express');
const router = express.Router();
const path = require('path')
const {all,getProduct,create,update,destroy} = require('../../controllers/apiController/productApiController')
const adminValidate = require('../../middlewares/adminValidate')
//const accountValidate = require('../middlewares/accountValidate')

const validationProduct = require('../../validaciones/validationProduct')

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,path.join(__dirname,"../../public/images"))
  },
  filename: (req,file,cb) => {
    cb(null,`${Date.now()}_img_ ${path.extname(file.originalname)}`)
  }
});

const upload = multer({storage})

router
.get('/all', all)
.get('/product/:id', getProduct)
.post('/product',validationProduct,create)
.put('/product/:id',validationProduct, update)
.delete('/product/:id', destroy)

/*
.get('/detail/:id', detail )

.get('/', actividades )

.get('/productCart', accountValidate, productCart)

.get("/dashboard", adminValidate, dashboard)

.get("/create", adminValidate ,productCreateView)
.post("/create",adminValidate, upload.single("imagen"), create)

.get("/edit/:id", adminValidate ,productEditView)
.put("/edit/:id", upload.single("imagen"), edit )

router.delete('/delete/:id', adminValidate, productDelete); 
*/

module.exports = router;