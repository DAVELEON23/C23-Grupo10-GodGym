const { error } = require("console");
const { json } = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const usersFilePath = path.join(__dirname, '../database/Users.json');
const {validationResult} = require("express-validator");

const UsersJson = () =>{
	const usersFilePath = path.join(__dirname, '../database/Users.json');
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	return users
}

const usersController = {
    viewRegister: (req, res) => {
      const users = UsersJson()
        res.render('users/register', { title: 'GOD GYM', users});
      },
      createRegister:(req,res) =>{
        const user = req.body;
        const users = UsersJson()
        const {nombre,apellido,fecha,email,contraseña} = req.body;
        const newUser = {
          id: uuidv4(),
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          fecha,
          email:email.trim(),
          contraseña: contraseña.trim()
        }
        users.push(newUser)
        const jsonUsers = JSON.stringify(users)
        fs.writeFileSync(usersFilePath, jsonUsers, 'utf-8')
        res.redirect('/')
      },

      login: (req, res) => {
        res.render('users/login', { title: 'GOD GYM'});
      },
      processLogin: (req, res) => {
        const errores = validationResult(req);
        if(!errores.isEmpty()) {res.render("/users/login", {errores: errores.mapped(), usuario:req.session.usuario})};
        const {email} = req.body; 
        const users = UsersJson("users");
        console.log("ver q hay en USERS",users);
        const user = users.find(usuario => usuario.email == email);
        console.log("ver q hay en USER",user);
        
          req.session.user = user;
          if (req.body.remember == "true"){
            res.cookie("user",user,{maxAge:1000*60*15});
            res.cookie("rememberMe","true",{maxAge:1000*60*15});
          } else {
          res.redirect('/');
          }
          
          // if (user) {
        //   console.log("ACA SE TIENE QUE IMPRIMIR LA SESSION",req.session);
        //   res.cookie('userName',user.nombre);
        //   res.cookie('userId',user.id);
        //   console.log("session:",req.session); //no llega el scoupe de usuario
          
        // } else {
        //   // res.send ("Error no te logeaste!!!")
        // }

        
      },


}


module.exports = usersController
