const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../database/productsHome.json"),"utf-8")
const products = JSON.parse(json);


const indexController = {
    home: (req, res) => {
      const usuario = req.session && req.session.user ? req.session.user : null;
        res.render('home',  { title: 'GOD GYM', products, usuario});
      }
}

module.exports = indexController;