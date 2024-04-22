const db = require("../../database/models");
const {Op, json} = require('sequelize');

const apiCategory= {
    all:(req,res) => {
        db.Category
        .findAll()
        .then(categories =>{
            const categoryArray = categories.map(categoria=>({
                id:categoria.id,
                name:categoria.name
            }));
            return res.status(200).json({
                count: categories.length,
                categories: categoryArray
            });
        })
        .catch(error => {
            console.error("Error al obtener categorias:", error);
            return res.status(500).json({
                message: "Error al obtener categorias"
            });
        })
    },
    
}

module.exports = apiCategory