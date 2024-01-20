const {getJson,setJson} = require('../utility/jsonMethod')
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const session =  require('express-session')
const usersFilePath = path.join(__dirname, '../database/Users.json');
const { validationResult } = require("express-validator")


const UsersJson = () =>{
	const usersFilePath = path.join(__dirname, '../database/Users.json');
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	return users
}

const usersController = {
  //vista del Registro
    viewRegister: (req, res) => {
      const users = UsersJson()
        res.render('users/register', { title: 'GOD GYM', users, usuario:req.session.user});
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

        }
        else{
        
        const users = UsersJson()
        const {nombre,apellido,fecha,email,contrasenia,rol} = req.body;
        const newUser = {
          id: uuidv4(),
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          fecha,
          email:email.trim(),
          contrasenia: bcrypt.hashSync(contrasenia,10),
          rol: rol ? rol : "usuario"
        }
        users.push(newUser)
        const jsonUsers = JSON.stringify(users)
        fs.writeFileSync(usersFilePath, jsonUsers, 'utf-8')
        res.redirect('/users/login')
      } 
        
      },

      login: (req, res) => {
        res.render('users/login', { title: 'GOD GYM' });
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
    
        const {email} = req.body
        const users = getJson("users")
        const user = users.find(usuario => usuario.email == email)
        if(user){
          req.session.user = user
          delete user.password
          res.cookie('user', {nombre:user.nombre,apellido:user.apellido, email:user.email,id:user.id, rol:user.rol},{maxAge: 1000 * 60 * 15})
          res.cookie('rememberMe', "true",{maxAge: 1000 * 60 * 15})
          res.redirect('/')

        } else {
          res.render('/users/login',{error:"no se encontro el usuario"})
        }
        
      },
      UserEditView: (req,res) => {
        const {id} = req.params;
		    const users = UsersJson()
        const user = users.find(elemento => elemento.id == id)
        res.render('users/usersEdit', {title: 'EDITAR USUARIO', user, usuario: req.session.user})
      },
      edit: (req,res) =>{
        const users = UsersJson()
        const {nombre,apellido,fecha,email,contraseña,rol} = req.body;
        const {id} = req.params;
        const usuarios = users.map(user =>{
          if(user.id == id){
            return {
              id: id ? id : user.id,
              nombre: nombre ? nombre : user.nombre,
              apellido: apellido ? apellido : user.apellido,
              fecha: fecha ? fecha : user.fecha,
              email: email ? email : user.email,
              contraseña: contraseña ? contraseña : user.contraseña,
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
		    const users = UsersJson()
        const user = users.find(elemento => elemento.id == id)
        res.render('users/perfil',{title:"PERFIL",user, usuario:req.session.user})
    }
      
}


module.exports = usersController
