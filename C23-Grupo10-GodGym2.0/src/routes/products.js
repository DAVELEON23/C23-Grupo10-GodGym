const express = require('express');
const router = express.Router();
const path = require('path')
const {detail,actividades, productCart,dashboard,edit,create,productCreateView, productEditView, productDelete} = require('../controllers/productsController')
/* GET home page. */
const accountValidate = require('../middlewares/accountValidate')
const multer = require('multer');
const validationProduct = require('../validaciones/validationProduct')
const validationProductEdit = require('../validaciones/validationProductEdit')
const adminValidate = require('../middlewares/adminValidate')
// MULTER---------------
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,path.join(__dirname,"../../public/images"))
  },
  filename: (req,file,cb) => {
    cb(null,`${Date.now()}_img_ ${path.extname(file.originalname)}`)
  }
});

const upload = multer({storage})
//---------------------

router
.get('/detail/:id', detail )

.get('/', actividades )

.get('/productCart', accountValidate, productCart)

.get("/dashboard", adminValidate, dashboard)

.get("/create", adminValidate ,productCreateView)
.post("/create",adminValidate, upload.single("imagen"),validationProduct, create)

.get("/edit/:id", adminValidate ,productEditView)
//Se creo validationProductEdit
.put("/edit/:id", upload.single("imagen"),validationProductEdit,edit ) 

router.delete('/delete/:id', adminValidate, productDelete); 


module.exports = router;