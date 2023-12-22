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
      res.render('products/dashboard', { title: 'DASHBOARD', products });
    },

    // vista formulario de edicion
    productEditView:(req, res) => {
      const {id} = req.params;
		  const products = getJson()
      const product = products.find(elemento => elemento.id == id );
      res.render('products/productEdit', { title: 'EDITAR PRODUCTO', product });
    },

    //metodo de edicion
    edit: (req,res) =>{
      const {nombre,imagen,informacion,horario,precio} = req.body;
      const {id} = req.params;
		  const products = getJson()
      const nuevoArray = products.map(product => {
        if(product.id == id){
          return{
            id:+id,
            nombre:nombre ? nombre : product.nombre,
            imagen:imagen ? imagen : product.imagen,
            horario:horario ? horario : product.horario,
            informacion:informacion ? informacion : product.informacion, 
            precio:+precio,
          }
        }
        return product
      })
      const json = JSON.stringify(nuevoArray)
		fs.writeFileSync(productsFilePath,json,"utf-8");
		res.redirect(`/products/dashboard`);
    },

    // vista formulario de creacion
    productCreateView: (req,res)=>{
      const product = req.body 
    const products = getJson()
    res.render("products/productCreate",{ title: "CREAR PRODUCTO",products});
    } ,

    //metodo de creacion
    create: (req,res)=>{
      //res.send(req.body)
    const file = req.file;
    const {nombre,imagen,informacion,horario,precio} = req.body;
    const products = getJson()
    const id = products[products.length -1].id +1 ;
		const nuevoObj = {
			id:+id,
      nombre,
      imagen: file ? file.filename : "default.webp",
      horario,
      informacion, 
      precio:+precio,
		}
    
    products.push(nuevoObj);
    const productJson = JSON.stringify(products);
    fs.writeFileSync(path.join(__dirname,"../database/products.json"),productJson,"utf-8");
    res.redirect("/products/dashboard")
    } ,
    
    //metodo de eliminacion
    productDelete: (req,res)=>{
      
      const products = getJson();
      const newList = products.filter(elemento => elemento.id !== +req.params.id);
      const json = JSON.stringify(newList);
      fs.writeFileSync(productsFilePath,json,'utf-8');
      res.redirect('/products/dashboard')
    }
  }
    

  
module.exports = productsController;
