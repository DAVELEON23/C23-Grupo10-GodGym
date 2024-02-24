const db = require('../database/models')

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
    res.render('products/detail', { title: product.nombre, product, usuario: req.session.user});
    },

    actividades: (req, res) => {
    const {id} = req.params;
    const products = getJson()
    res.render('products', { title: 'GOD GYM', products, usuario: req.session.user });
    },

    productCart: (req, res) => {
      const {id} = req.params;
		  const products = getJson()
      res.render('products/cart', { title: 'GOD GYM', products, usuario: req.session.user});
    },

    dashboard:(req, res) => {
      const {id} = req.params;
		  const products = getJson()
      res.render('products/dashboard', { title: 'DASHBOARD', products, usuario: req.session.user });
    },

    // vista formulario de edicion
    productEditView:(req, res) => {
      const {id} = req.params;
		  const products = getJson()
      const product = products.find(elemento => elemento.id == id );
      res.render('products/productEdit', { title: 'EDITAR PRODUCTO', product, usuario: req.session.user });
    },

    //metodo de edicion
    edit: (req,res) =>{
      const images = [] // --------------------BORRAR
      if(req.files){    // --------------------BORRAR
        files.forEach(element => { //----------BORRAR
          images.push(element.filename) //-----BORRAR
        });
      }
      const {nombre,imagen,informacion,horario,precio} = req.body;//***QUEDA*******
      const {id} = req.params;//***QUEDA*******
		  const products = getJson()//--------------------BORRAR
      const nuevoArray = products.map(product => {//---BORRAR
        if(product.id == id){                    //----BORRAR
          return{
          //db.product.update({})**AGREGAR**
            id:+id,
            nombre:nombre ? nombre : product.nombre,            //actividad:actividad.trim(),
            imagen: images.length > 0 ? images : product.imagen,//horario:horario.trim
            horario:horario ? horario : product.horario,//-------precio:precio
            informacion:informacion ? informacion : product.informacion,//cupos:cupos 
            precio:+precio, //----------------------------------imagen:req.file ? req.filename : default.webp
          }
          /* {where:{  **AGREGAR**
            id,
          }}*/
        }
        return product
      })
      const json = JSON.stringify(nuevoArray)//-----BORRAR
		fs.writeFileSync(productsFilePath,json,"utf-8");//-----BORRAR
		res.redirect(`/products/dashboard`);//***QUEDA*******
    },

    // vista formulario de creacion
    productCreateView: (req,res)=>{
      const product = req.body 
    const products = getJson()
    res.render("products/productCreate",{ title: "CREAR PRODUCTO",products, usuario: req.session.user});
    } ,

    //metodo de creacion
    create: (req,res)=>{
      
    const file = req.file;
    const {nombre,imagen,informacion,horario,precio} = req.body;
    const products = getJson() //BORRAR
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
      const product = products.find(producto => producto.id == +req.params.id)
      const newList = products.filter(elemento => elemento.id !== +req.params.id);
      const json = JSON.stringify(newList);
      
      fs.unlink(`./public/images/${product.imagen}`, (err)=>{
        if(err) throw err;
        console.log(`borre el archivo ${product.imagen}`)
        })
        
      fs.writeFileSync(productsFilePath,json,'utf-8');
      res.redirect('/products/dashboard')
    }
  }
    

  
module.exports = productsController;
