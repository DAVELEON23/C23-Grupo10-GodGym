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
    //const {id} = req.params;
		//const products = getJson()
      const {id} = req.params
      db.Product.findByPk(id)
        .then(() => {
          res.render('products/cart', { title: 'GOD GYM', usuario: req.session.user});
      })
      
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
    const product = db.Product.findByPk(id);  //FALTA AGREGAR CODICO!!! INCLUDE+ ASSOCIATION--->>> Y DESPUES HACER LA LOGICA PARA MUESTRE EL NOMBRE 
      Promise.all([product]) // ACA HAY UN PROBLEMA CON LA DB??
      
      .then(([product])=>{
      return res.render('products/productEdit', { title: product.actividad, product:product, usuario: req.session.user});
      })
      .catch(error=> console.log(error));
    },
    //metodo de edicion
    edit: (req,res) =>{
      const {actividad,imagen,informacion,horario,precio,cupos,category} = req.body;
      const {id}= req.params
      db.Product.update(
        {
          actividad:actividad.trim(),
          horario:horario.trim(),
          cupos:cupos ,
          precio:precio ? precio : 0,
          imagen:req.file ? req.file.filename : imagen,
          informacion:informacion,
          id_category: category,
          updatedAt: new Date(),
          
          // ver de agregar categorias!!!!!!!!!!!!!!!!!!!!!!

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

        res.render("products/productCreate",{ title: "CREAR PRODUCTO" ,usuario: req.session.user});
    } ,

    //metodo de creacion
    create: (req,res)=>{
      db.Product.create({
        actividad:req.body.actividad,
          horario:req.body.horario,
          cupos:req.body.cupos ,
          precio:req.body.precio,
          imagen:req.file ? req.file.filename : "default.webp",
          informacion:req.body.informacion,
          updatedAt: new Date(),        
          // ver de agregar categorias!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

          //FALTAN LAS MIGRACIONES Y LOS SEEDERS

      })
      .then(()=>{
        res.redirect("/products/dashboard")
      })
    
    
    } ,
    
    //metodo de eliminacion
    productDelete: (req,res)=>{
      const { id } = req.params;
      db.Product.destroy({
        where: {
          id,
        }
      })
      .then(()=>{
        res.redirect("/products/dashboard");
      })
      
    }
  }
    

  
module.exports = productsController;
