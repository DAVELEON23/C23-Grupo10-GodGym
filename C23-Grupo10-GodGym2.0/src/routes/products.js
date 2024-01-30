const express = require('express');
const router = express.Router();
const path = require('path')
const {detail,actividades, productCart,dashboard,edit,create,productCreateView, productEditView, productDelete} = require('../controllers/productsController')
/* GET home page. */
const accountValidate = require('../middlewares/accountValidate')
const multer = require('multer');

const adminValidate = require('../middlewares/adminValidate')

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
.get('/detail/:id', detail )

.get('/', actividades )

.get('/productCart', accountValidate, productCart)

.get("/dashboard", adminValidate, dashboard)

.get("/create", adminValidate ,productCreateView)
.post("/create",adminValidate, upload.single("imagen"), create)

.get("/edit/:id", adminValidate ,productEditView)
.put("/edit/:id", upload.single("imagen"), edit )

router.delete('/delete/:id', adminValidate, productDelete); 


module.exports = router;