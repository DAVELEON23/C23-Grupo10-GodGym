const express = require('express');
const router = express.Router();
const path = require('path')
const {detail,actividades, productCart,dashboard,edit,create,productCreateView, productEditView, productDelete} = require('../controllers/productsController')
/* GET home page. */

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
.get('/detail/:id', detail )

.get('/', actividades )

.get('/productCart', productCart)

.get("/dashboard",dashboard)

.get("/create",productCreateView)
.post("/create", upload.single("imagen"), create)

.get("/edit/:id",productEditView)
.put("/edit/:id", edit )

router.delete('/delete/:id', productDelete); 


module.exports = router;