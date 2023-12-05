const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../database/products.json"),"utf-8")
const products = JSON.parse(json);


const productsController = {
      detail: (req, res) => {
        const {id} = req.params;
        const product = products.find(producto => producto.id == id);
        res.render('products/detail', { title: product.nombre, product });
    },
}
    
module.exports = productsController
