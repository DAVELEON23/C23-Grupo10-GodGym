const express = require('express');
const router = express.Router();
const {detail,actividades, productCart,dashboard,edit,create,productCreateView} = require('../controllers/productsController')
/* GET home page. */



router
.get('/detail/:id', detail )
.get('/', actividades )
.get('/productCart', productCart)
.get("/dashboard",dashboard)

.get("/productCreate",productCreateView)
.post("/productCreate",create)

.get("/productEdit/:id",edit)


module.exports = router;