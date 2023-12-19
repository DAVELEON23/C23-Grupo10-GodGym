const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../database/products.json');

const getJson = () =>{
	const productsFilePath = path.join(__dirname, '../database/products.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products
}


const productsController = {

    detail: (req, res) => {
    const {id} = req.params;
    const products = getJson()
    const product = products.find(product => product.id == id);
    res.render('products/detail', { title: product.nombre, product});
    },

    actividades: (req, res) => {
    const {id} = req.params;
    const products = getJson()
    res.render('products', { title: 'GOD GYM', products });
    },

    productCart: (req, res) => {
      const {id} = req.params;
		  const products = getJson()
      res.render('products/cart', { title: 'GOD GYM', products });
    },

    dashboard:(req, res) => {
      const {id} = req.params;
		  const products = getJson()
      res.render('products/dashboard', { title: 'dashboard', products });
    },

    // vista formulario de edicion
    productEditView:(req, res) => {
      const {id} = req.params;
		  const products = getJson()
      const product = products.find(elemento => elemento.id == id );
      res.render('products/productEdit', { title: 'Editar', product });
    },

    //metodo de edicion
    edit: (req,res) =>{
      const {id} = req.params;
		  const products = getJson()

    },

    // vista formulario de creacion
    productCreateView: (req,res)=>{
    res.render("products/productCreate",{ title: "Crear"});
    } ,

    //metodo de creacion
    create: (req,res)=>{
    const product = req.body 
    const products = getJson()
    product.id = products[products.length-1].id +1;
    products.push(product);
    const productJson = JSON.stringify(products);
    fs.writeFileSync(path.join(__dirname,"../database/product.json"),productJson,"utf-8");
    res.redirect("/products/dashboard")
    } ,
    
    //metodo de eliminacion
    productDelete: (req,res)=>{
      
      const products = getJson();
      const newList = products.filter(elemento => elemento.id !== +req.params.id);
      const json = JSON.stringify(newList);
      fs.writeFileSync(productsFilePath,json,'utf-8');
      res.redirect('/products')
    }
  }
    

  
module.exports = productsController;
