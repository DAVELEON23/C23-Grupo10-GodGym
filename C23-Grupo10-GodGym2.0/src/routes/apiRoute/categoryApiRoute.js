const express = require('express');
const router = express.Router();
const {all} = require('../../controllers/apiController/apiCategory')



router
.get('/allcategories', all)



module.exports = router;