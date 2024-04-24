const db = require ("../database/models")
const {body} = require("express-validator");


const validationRegister = [
    body("nombre").notEmpty().withMessage('Por favor complete este campo').bail()
        .isLength({min:3,max:20}).withMessage('Debe ingresar entre tres y 20 caracteres').bail(),

    body("apellido").notEmpty().withMessage('Por favor complete este campo').bail()
    .isLength({min:3,max:20}).withMessage('Debe ingresar entre tres y 20 caracteres').bail(),

    body("fecha_de_nacimiento").notEmpty().withMessage('Por favor complete este campo').bail()
        .custom(value => {
            return !isNaN(Date.parse(value))
        }).withMessage('Ingrese una fecha valida').bail(),
        
    body("email").notEmpty().withMessage('Por favor complete este campo').bail()
        .isEmail().withMessage('Debe ingresar un formato de correo valido').bail()
        .custom(value => {
            return db.User.findOne({
                where: {email: value}
            })
            .then(user => {
                if (user) {return Promise.reject('El email se encuentra registrado')}
            })
            .catch(() => {
                return Promise.reject('El email se encuentra registrado 2')
            })
    }),
        
    body("password").notEmpty().withMessage('Por favor complete este campo').bail()
        .custom((value,{req}) =>{
            return value == req.body.password2;
        }).withMessage('las credenciales no coinciden')
        
    
]

module.exports = validationRegister;