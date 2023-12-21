const { json } = require("express");
const fs = require("fs");
const path = require("path");

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
        const users = UsersJson()
        const {nombre,apellido,fecha,email,contraseña} = req.body
      
        const newUser = {
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
      
}


module.exports = usersController
