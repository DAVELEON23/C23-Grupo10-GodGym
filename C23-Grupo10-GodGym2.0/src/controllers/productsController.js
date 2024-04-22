const db = require('../database/models')
const {Op} = require('sequelize');
const fs = require("fs");
const path = require("path");
const { log } = require('console');
const productsFilePath = path.join(__dirname, '../database/products.json');

const productsController = {

    detail: (req, res) => {
    const id = req.params.id;
    const product = db.Product.findByPk(id,{include: [{association:"Category"}]});
      Promise.all([product])
      .then(([product])=>{
      return res.render('products/detail', { title: product.actividad, product:product, usuario: req.session.user});
      })
      .catch(error=> console.log(error));
    
    },

    actividades: (req, res) => {
      const products = db.Product.findAll({include: [{association:"Category"}]});
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
      db.Product.findAll()
        .then((products) => {
          res.render('products/cart', { title: 'GOD GYM',products, usuario: req.session.user});
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
      const product = db.Product.findByPk(id);  
      Promise.all([product]) 
      
      .then(([product])=>{
      return res.render('products/productEdit', { title: product.actividad, product:product, usuario: req.session.user});
      })
      .catch(error=> console.log(error));
    },
    //metodo de edicion
    edit: (req,res) =>{
      const {actividad,imagen,informacion,horario,precio,cupos,id_category} = req.body;
      const {id}= req.params
      db.Product.findByPk(id)
    .then((product) => {
      if (product) {
        
        product.update(
          {
            actividad: actividad.trim(),
            horario: horario.trim(),
            cupos: cupos,
            precio: precio ? precio : 0,
            imagen: req.file ? req.file.filename : imagen,
            informacion: informacion,
            id_category,
            updatedAt: new Date()
          }
        )
      }
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
      const {actividad,informacion,horario,precio,cupos,id_category} = req.body;

        db.Product.create(
          {
          actividad,
          horario,
          cupos,
          precio,
          imagen:req.file ? req.file.filename : "default.webp",
          informacion,
          id_category,
          updatedAt: new Date(),        
          
          })
          .then(()=>{
        res.redirect("/products/dashboard")
      })
      },
      
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


//APLICAR ASYNC TRY AND CATCH Y VALIDACIONES BACK Y FRONT LAS QUE FALTEN 