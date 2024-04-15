const db = require('../../database/models')
const {Op, json} = require('sequelize');
const {validationResult} = require('express-validator')
//const fs = require("fs");
//const path = require("path");


const productsApiController = {
    all:(req,res) => {
      db.Product.findAll()
      .then(respuesta => {
        res.send(respuesta)
      })
    },
    getProduct: async (req,res) => {
      try {
        const id = parseInt(req.params.id);
  
        if (!Number.isInteger(id)) {
          throw new Error(`El ID indicado debe ser un numero entero`);
        }
  
        const product = await db.Product.findByPk(id);
  
        if(!product){
          throw new Error(`No existe un producto con el ID ${id} indicado`);
        }
        const infoProduct ={
          id:product.id,
          actividad:product.actividad,
          info:product.informacion,
          precio:product.precio,
          imaagen:`/images/${product.imagen}`
        }
  
        res.status(200).send(infoProduct)
      }
       catch (error) {
        return res.status(400).send(error.message)
      }
    },
    
     //metodo de creacion
     create: async (req,res)=>{
        const errores = validationResult(req);
        try {
          if(errores.isEmpty()){
            const product = await db.Product.create({
                actividad:req.body.actividad,
                horario:req.body.horario,
                cupos:req.body.cupos ,
                precio:req.body.precio,
                imagen:req.file ? req.file.filename : "default.webp",
                informacion:req.body.informacion,
                updatedAt: new Date(),
            })
           return res.status(200).send(product)  
        }
        else {
            const erroresMaped = errores.mapped();
            for (const key in erroresMaped) {
                delete erroresMaped[key].type;
                delete erroresMaped[key].location;
                delete erroresMaped[key].path;
                
            }
            const jsonError = JSON.stringify(erroresMaped)
           
            throw new Error(jsonError)
        }
        }
        catch (error){
          res.status(400).send(error.message)
        }
        
        
      } ,
      //ACTUALIZACION
      update: async (req,res) => {
        try {
          const errores = validationResult(req);
          const id = parseInt(req.params.id);
          if (!Number.isInteger(id)) {
            throw new Error(`El ID indicado debe ser un numero entero`);
          }
          if (errores.isEmpty()) {
            const product = await db.Product.findByPk(id);
            if (!product)
              throw new Error(`No existe un producto con el ID "${id}" indicado`);
            await product.update(req.body);
            return res.status(200).send(product);
          } else {
            const erroresMapeado = errores.mapped();
            for (const key in erroresMapeado) {
              delete erroresMapeado[key].type;
              delete erroresMapeado[key].location;
              delete erroresMapeado[key].path;
            }
    
            const errorStringify = JSON.stringify(erroresMapeado);
            throw new Error(errorStringify);
          }
        }
         catch (error) {
          return res.status(400).send(error.message);
        }
      },
      destroy: async (req,res) => {
        try {
          const id = parseInt(req.params.id);
    
          if (!Number.isInteger(id)) {
            throw new Error(`El ID indicado debe ser un numero entero`);
          }
    
          const product = await db.Product.findByPk(id);
    
          if(!product){
            throw new Error(`No existe un producto con el ID ${id} indicado`);
          }
    
          await product.destroy();
    
          res.status(200).send(`El producto id ${id} fue eliminado`)
        }
        catch (error) {
          return res.status(400).send(error.message)
        }
      }
    /*
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

        res.render("products/productCreate",{ title: "CREAR PRODUCTO" ,usuario: req.session.user});
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
    */
  }
    

  
module.exports = productsApiController;
