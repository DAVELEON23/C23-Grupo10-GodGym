
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
const session =  require('express-session')
const { validationResult } = require("express-validator");
const db = require("../database/models");
const { where } = require("sequelize");

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
              // aptoMedico,
              id_roles:3, 
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
    edit: (req,res) =>{
      const id = req.params.id;
      const {nombre,apellido,fecha_de_nacimiento,direccion,cp,aptoMedico} = req.body;
      db.User.findByPk(id)
      .then((user)=>{ 
        console.log ("lo que llega del usuario",user)
        return user.update(
          {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            direccion: direccion.trim(),
            cp ,
            fecha_de_nacimiento,                         //variable modificada
            aptoMedico: aptoMedico == "true" ? "si" : "no", 
            updatedAt: new Date()
      })
      })
.then(() => {
        res.redirect(`/users/perfil/${id}`);
      })
      .catch((err)=>{
            console.log(err)
          });
  }   
}


module.exports = usersController
