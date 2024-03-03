const db = require('../database/models')
const {Op} = require('sequelize');
const fs = require("fs");
const path = require("path");
const { log } = require('console');

const productsFilePath = path.join(__dirname, '../database/products.json');




const productsController = {

    detail: (req, res) => {
    const id = req.params.id;
    const product = db.Product.findByPk(id);
      Promise.all([product])
      .then(([product])=>{
       return res.render('products/detail', { title: product.actividad, product:product, usuario: req.session.user});
      })
      .catch(error=> console.log(error));
    
    },

    actividades: (req, res) => {
      const products = db.Product.findAll();
      Promise.all([products])
      .then(([products])=>{
        res.render('products', { title: 'GOD GYM', products, usuario: req.session.user });
      })
      .catch((error)=>console.log(error))
    
    
    },

    productCart: (req, res) => {
    const {id} = req.params;
		const products = getJson()
   
      res.render('products/cart', { title: 'GOD GYM', products, usuario: req.session.user});
    },

    dashboard:(req, res) => {
      const product = db.Product.findAll();
        Promise.all([product])
        .then(([product])=>{
         return res.render('products/dashboard', { title:"DASHBOARD", Products:product, usuario: req.session.user});
        })
        .catch(error=> console.log(error));
    },

    // vista formulario de edicion
    productEditView:(req, res)=>{
      const id = req.params.id;
    const product = db.Product.findByPk(id);
      Promise.all([product])
      .then(([product])=>{
       return res.render('products/productEdit', { title: product.actividad, product:product, usuario: req.session.user});
      })
      .catch(error=> console.log(error));
    },
    //metodo de edicion
    edit: (req,res) =>{
      const {actividad,imagen,informacion,horario,precio,cupos} = req.body;
      const {id}= req.params
      db.Product.update(
        {
          actividad:actividad.trim(),
          horario:horario.trim(),
          cupos:cupos ,
          precio:precio,
          imagen:req.file ? req.file.filename : imagen,
          informacion:informacion,
          updatedAt: new Date(),
        },
        {
          where:{
            id,
          }
        }) 
        .then(() => {
          res.redirect(`/products/dashboard`);
        })
        .catch((err) => console.log(err));
        
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
      const { id } = req.params;
      db.User.destroy({
        where: {
          id,
        }
      })
        .then((resp) => {
          res.redirect("/products/dashboard");
        })
        .catch((err) => console.log(err));
    }
   
 
      
    /* { const products = getJson();
      const product = products.find(producto => producto.id == +req.params.id)
      const newList = products.filter(elemento => elemento.id !== +req.params.id);
      const json = JSON.stringify(newList);
      
      fs.unlink(`./public/images/${product.imagen}`, (err)=>{
        if(err) throw err;
        console.log(`borre el archivo ${product.imagen}`)
        })
        
      fs.writeFileSync(productsFilePath,json,'utf-8');
      res.redirect('/products/dashboard')
    }*/
  }
    

  
module.exports = productsController;
