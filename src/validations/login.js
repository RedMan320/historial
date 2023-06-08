const {check} = require('express-validator');
/* const bcrypt = require('bcryptjs'); */
const db = require('../database/models')

module.exports = [
     check('user')
    .notEmpty().withMessage('Debe ingresar usuario ').bail()
    .custom((value,{req}) => {
        
        return db.Usuarios.findOne({
            where : {
                usuario : value,
            }
        })
            .then(usuario => {
                if(!usuario){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('Credenciales inválidas'))
    }),
    
    check('pass')
    .notEmpty().withMessage('Debe ingresar contraseña')
    .custom((value,{req}) => {
        
        return db.Usuarios.findOne({
            where : {
                usuario : req.body.user,
            }
        })
            .then(usuario => {
                console.log(req.body.pass == usuario.contraseña);
                if(+req.body.pass == usuario.contraseña){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('Credenciales inválidas'))
    })
]