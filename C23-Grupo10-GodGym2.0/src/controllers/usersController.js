const {getJson,setJson} = require('../utility/jsonMethod')
const fs = require("fs");
const path = require("path");
// const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const session =  require('express-session')
const usersFilePath = path.join(__dirname, '../database/Users.json');
const { validationResult } = require("express-validator");
const db = require("../database/models")


const UsersJson = () =>{
	const usersFilePath = path.join(__dirname, '../database/Users.json');
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	return users
}

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
              // direccion: direccion.trim(),
              // cp ,
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
      //   const {nombre,apellido,fecha_de_nacimiento,email,password,aptoMedico,id_roles} = req.body; 
      //   const user ={
      //     nombre: nombre.trim(),
      //     apellido: apellido.trim(),
      //     direccion: direccion.trim(),
      //     cp ,
      //     fecha_de_nacimiento,                         //variable modificada
      //     email:email.trim(),
      //     password: bcrypt.hashSync(password,10),
      //     aptoMedico,                                 //nueva variable agregada
      //     id_roles: 3,         //variable roles modificada
      //   }
      //   db.user.create(user)
      //   .then((user)=>{
      //     users.push(user)
      //       res.redirect('/users/login')
      //   })
      //   .catch((err)=>{
      //     console.log(err)
      //   });       
      // } 
        
      // },

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

      UserEditView: (req,res) => {
        const {id} = req.params;
		    const users = UsersJson()
        const user = users.find(elemento => elemento.id == id)
        res.render('users/usersEdit', {title: 'EDITAR USUARIO', user, usuario: req.session.user})
      },

      edit: (req,res) =>{
        const users = UsersJson()
        const {nombre,apellido,fecha,email,contrasenia,rol} = req.body;
        const {id} = req.params;
        const usuarios = users.map(user =>{
          if(user.id == id){
            return {
              id: id ? id : user.id,
              nombre: nombre ? nombre : user.nombre,
              apellido: apellido ? apellido : user.apellido,
              fecha: fecha ? fecha : user.fecha,
              email: email ? email : user.email,
              contrasenia: contrasenia ? contrasenia : user.contrasenia,
              rol: rol ? rol : user.rol

            }
          }
          return user
        })
        
          setJson(usuarios, "users")
          const userUpdate = usuarios.find(elemento => elemento.id == id)
          req.session.user = userUpdate
          res.cookie('user',({nombre:userUpdate.nombre, apellido: userUpdate.apellido, email: userUpdate.email, id: userUpdate.id, rol:userUpdate.rol}))
        
        res.redirect('/')
        
    },
    viewPerfil: (req,res) =>{
      const {id} = req.params;
		    db.User.findByPk(req.session.user.id)
        .then((response)=>{
          res.render('users/perfil',{title:"PERFIL",user:response.dataValues, usuario:req.session.user})
        })
        .catch((err)=>{
          console.log(err)
        })
    }
      
}


module.exports = usersController
