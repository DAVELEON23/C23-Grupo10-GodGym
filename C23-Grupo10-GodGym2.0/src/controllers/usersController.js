
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
const session =  require('express-session')
const { validationResult } = require("express-validator");
const db = require("../database/models");
const { where, Association } = require("sequelize");

const usersController = {
  //vista del Registro
    viewRegister: (req, res) => {
        res.render('users/register', { title: 'GOD GYM', usuario:null});
      },
  //vista para llenar el formulario

      createRegister:(req,res) =>{
        const resultValidation = validationResult(req);
        console.log(resultValidation)
        if(resultValidation.errors.length > 0){
            res.render('users/register', { 
            errors:resultValidation.mapped(),
            oldData: req.body,
            title: 'GOD GYM',
            usuario:req.session.user
          });
        } else {
        
        const {nombre,apellido,fecha_de_nacimiento,email,password,} = req.body;
        db.User.create({
              nombre: nombre.trim(),
              apellido: apellido.trim(),
              fecha_de_nacimiento,                         //variable modificada
              email:email.trim(),
              password: bcrypt.hashSync(password,10),
              // aptoMedico:"NO",
              id_roles:3, 
              imagen:"imageDefault.jpg",
              createAt: Date
        })
        .then(()=>{
            res.redirect("/users/login")
        })
        .catch((err)=>{
              console.log(err)
            });       
    }
    },

      login: (req, res) => {
        res.render('users/login', { title: 'GOD GYM',usuario:req.session.user });
      },
      logout: (req,res)=>{
        req.session.destroy()
        if(req.cookies.user){
          res.clearCookie('user')
          res.clearCookie('remember')
        }
        res.redirect('/')
      },
      processLogin: (req,res) =>{
        const errores = validationResult(req);

        if(!errores.isEmpty()) {
          res.render("users/login",{errores:errores.mapped(), title:'GOD GYM', usuario:req.session.user});
        } else{
        const {email} = req.body;
        db.User.findOne({
          attributes:{
            exclude:["password"]
          }, 
          where:{email}
        })
        .then((user)=>{
          req.session.user = user.dataValues;

        if(req.body.remember == "true"){
          res.cookie('user',user.dataValues,{maxAge: 1000 * 60 * 15})
          res.cookie('remember', "true",{maxAge: 1000 * 60 * 15})
          
          }res.redirect('/')
        })
        .catch((err)=>{
          console.log(err)
        })
        
      }},

    viewPerfil: (req,res) =>{
      const {id} = req.params;
		    db.User.findByPk(req.session.user.id)
        .then((response)=>{
          res.render('users/perfil',{title:"PERFIL",usuario:response.dataValues,})
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    
    //edicion de perfil por parte del usuario
    edit: (req,res) =>{
      const id = req.params.id;
      const {nombre,apellido,fecha_de_nacimiento,direccion,cp,aptoMedico,imagen} = req.body;
      db.User.findByPk(id)
      .then((user)=>{ 
        console.log ("lo que llega del usuario",user)
        
        return user.update(
          {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            direccion: direccion.trim(),
            cp : cp ? cp:0,
            fecha_de_nacimiento,                         //variable modificada
            imagen:req.file ? req.file.filename : imagen,
            aptoMedico: aptoMedico == "true" ? "SI" : "NO", 
            updatedAt: new Date()
      })
      })
.then(() => {
        res.redirect(`/users/perfil/${id}`);
      })
      .catch((err)=>{
            console.log(err)
          }); 
          
  },
  //DASHBOARD DE USUARIO
  userDashboard:(req, res) => {
    const user = db.User.findAll({include: [{association:"Roles"}]});
      Promise.all([user])
      .then(([user])=>{
      return res.render('users/dashboard', { title:"userdashboard", Users:user, usuario: req.session.user});
      })
      .catch(error=> console.log(error));
  },

  perfilDashboard: (req,res) =>{
    const {id} = req.params;
      db.User.findByPk(id)
      .then((user)=>{
        res.render('users/editPerfil',{title:"dashboard",users:user,usuario:req.session.user})
      })
      .catch((err)=>{
        console.log(err)
      })
  },

  //edicion de perfil por parte del admin
  editDashboard: (req,res) =>{
    const id = req.params.id;
    const {nombre,apellido,fecha_de_nacimiento,direccion,cp,aptoMedico,imagen} = req.body;
  db.User.findByPk(id)
    .then((user)=>{ 
      return user.update(
        {
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          direccion: direccion,
          cp ,
          fecha_de_nacimiento,                         //variable modificada
          imagen:req.file ? req.file.filename : imagen,
          aptoMedico, 
          updatedAt: new Date()
    })
    })
    
    .then(() => {
      res.redirect(`/users/dashboard`);
    })
    .catch((err)=>{
          console.log(err)
        });       
},

//metodo de eliminacion
userDelete: (req,res)=>{
  const { id } = req.params;
  db.User.destroy({
    where: {
      id,
    }
  })
  .then(()=>{
    res.redirect("/users/dashboard");
  })
  
}
}



module.exports = usersController
