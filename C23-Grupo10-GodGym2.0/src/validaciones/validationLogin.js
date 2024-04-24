const {body} = require("express-validator");
const{getJson} = require("../utility/jsonMethod");
const bcrypt = require("bcrypt");
const db = require("../database/models");


module.exports = [
    body("email").notEmpty().withMessage("Debes completar el E-mail").bail()
    .isEmail().withMessage("Debes ingresar un formato valido para Email").bail()
    .custom(value =>{
        return db.User.findOne({
            where: {email: value}
        }).then(user => {
            if (!user) {
                return Promise.reject('Email no registrado')}
        }).catch(() => {
            return Promise.reject('Email no registrado')})
    }).withMessage("Credenciales invalidas"),

    body("password").notEmpty().withMessage("Debes ingresar una contraseña valida").bail()
    .custom((value, {req}) => {
        return db.User.findOne({
                where: {email: req.body.email}
            }).then(user => {
                if (!bcrypt.compareSync(value, user.dataValues.password)) { 
                    return Promise.reject('Mal tipeo de contraseña')}
            }).catch(() => {
                return Promise.reject('Contraseña incorrecta')
            })
        })

]

