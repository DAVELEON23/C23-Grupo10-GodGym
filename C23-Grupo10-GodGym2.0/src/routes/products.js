const express = require('express');
const router = express.Router();
const {detail,actividades, productCart,dashboard} = require('../controllers/productsController')
/* GET home page. */



router
.get('/detail/:id', detail )
.get('/actividades', actividades )
.get('/productCart', productCart)
.get("/dashboard",dashboard)




module.exports = router;