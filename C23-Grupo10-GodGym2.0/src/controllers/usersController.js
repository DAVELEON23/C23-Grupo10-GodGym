const { json } = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const usersFilePath = path.join(__dirname, '../database/Users.json');

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
      UserEditView: (req,res) => {
        const {id} = req.params;
		    const users = UsersJson()
        const user = users.find(elemento => elemento.id == id)
        res.render('users/usersEdit', {title: 'EDITAR USUARIO', user})
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
