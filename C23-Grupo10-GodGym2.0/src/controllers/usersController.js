const { json } = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const {validationResult} =  require('express-session')
const usersFilePath = path.join(__dirname, '../database/Users.json');
const { validationResult } = require("express-validator")


const UsersJson = () =>{
	const usersFilePath = path.join(__dirname, '../database/Users.json');
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	return users
}

const usersController = {
    viewRegister: (req, res) => {
      const users = UsersJson()
        res.render('users/register', { title: 'GOD GYM', users, usuario:req.session.user});
      },
      createRegister:(req,res) =>{
        const resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0){
           res.render('users/register', { 
            errors:resultValidation.mapped(),
            oldData: req.body,
            title: 'GOD GYM'
          });

        }
        else{
          const user = req.body;
        const users = UsersJson()
        const {nombre,apellido,fecha,email,contraseña,rol} = req.body;
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
      processLogin: (req,res) =>{
    
        const {email} = req.body
        const users = getJson("users")
        const user = users.find(usuario => usuario.email == email)
        if(user){
          req.session.user = user
          res.cookie('userEmail', user.email,{maxAge: 1000 * 60 * 15})
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
        const {nombre,apellido,fecha,email,contraseña} = req.body;
        const {id} = req.params;
        
        const nuevoUsuario = users.map(user => {
          if(user.id == id){
            return{
              id: id ? id : user.id,
              nombre: nombre ? nombre : user.nombre,
              apellido: apellido ? apellido : user.apellido,
              fecha: fecha ? fecha : user.fecha,
              email: email ? email : user.email,
              contraseña: contraseña ? contraseña : user.contraseña,

            }
          }
          return user
        })
          const json = JSON.stringify(nuevoUsuario)
        fs.writeFileSync(usersFilePath,json,'utf-8')
        res.redirect('/')
        
    }
      
}


module.exports = usersController
