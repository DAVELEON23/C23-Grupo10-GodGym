
// const fs = require("fs");
// const path = require("path");
// const bcrypt = require('bcrypt');
// const session =  require('express-session')
// const { validationResult } = require("express-validator");
const db = require("../../database/models");
const {Op, json} = require('sequelize');

const usersApiController = {
    all: (req, res) => {
        db.User
        .findAll()
        .then(usuarios => {
            const usersArray = usuarios.map(usuario => ({
                id: usuario.id,
                name: usuario.nombre.charAt(0).toUpperCase() + usuario.nombre.slice(1).toLowerCase(),
                email: usuario.email,
                aptoMedico:usuario.aptoMedico,
                detail: `/api/user/${usuario.id}`
            }));

            return res.status(200).json({
                count: usuarios.length,
                users: usersArray
            });
        })
        .catch(error => {
            console.error("Error al obtener usuarios:", error);
            return res.status(500).json({
                message: "Error al obtener usuarios"
            });
        });
    },

    //vista del Registro
    userId: (req, res) => {
        db.User
        .findByPk(req.params.id)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({
                    message: "Usuario no encontrado"
                });
            }

            // Información del usuario
            const userData = {
                id: usuario.id,
                name: usuario.nombre,
                email: usuario.email,
                imagen: `/images/userImage/${usuario.imagen}`, 
            };

            return res.status(200).json(userData);
        })
        .catch(error => {
            console.error("Error al obtener usuario por ID:", error);
            return res.status(500).json({
                message: "Error al obtener usuario por ID"
            });
        });
    },
    // Crear Usuario    
    create: (req,res) => {
        db.User
        .create(req.body)
        .then(usuario => {
            return res.status(200).json({
                status: 200,
                data: usuario,
                })
            })
        },

    //Eliminar Usuario
    delete: (req,res) => {
        db.User
        destroy({
            where: {                       //NO OLVIDAR NUNCA COLOCAR EL WHERE EN EL METODO DELETE!!
                id: req.params.id
            }
        })
        .then(resp =>{
            return res.json(resp)
        })
    },

}

module.exports = usersApiController