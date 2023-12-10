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
      actividades: (req, res) => {
      res.render('products/actividades', { title: 'GOD GYM', products });
    },
    productCart: (req, res) => {
      res.render('products/cart', { title: 'GOD GYM', products });
    },
    dashboard:(req, res) => {
      res.render('products/dashboard', { title: 'dashboard', products });
    },
    edit:(req, res) => {
      const {id} = req.params;
      const produc = products.find(elemento => elemento.id == id );
      res.render('products/productEdit', { title: 'Editar', products });
    },
    create: (req,res)=>{
      const product = req.body 
      product.id = products[products.length-1].id +1;
      products.push(product);
      const productjson = JSON.stringify(products);
      fs.writeFileSync(path.join(__dirname,"../database/product.json"),productjson,"utf-8");
      res.redirect("/products/dashboard")
  },
  productCreateView: (req,res)=>{
    res.render("products/productCreate",{ title: "Crear"});
},
}
    
module.exports = productsController;
