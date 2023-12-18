const express = require('express');
const router = express.Router();
const {detail,actividades, productCart,dashboard,edit,create,productCreateView, productEditView, productDelete} = require('../controllers/productsController')
/* GET home page. */



router
.get('/detail/:id', detail )

.get('/', actividades )

.get('/productCart', productCart)

.get("/dashboard",dashboard)

.get("/create",productCreateView)
.post("/create",create)

.get("/edit/:id",productEditView)
.put("/edit/:id", edit )

router.delete('/delete/:id', productDelete); 


module.exports = router;