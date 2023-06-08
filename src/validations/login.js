const { check } = require('express-validator');
const db = require('../database/models');

module.exports = [
  check('user')
    .notEmpty().withMessage('Debe ingresar usuario')
    .custom((value, { req }) => {
      return db.Usuarios.findOne({
        where: {
          usuario: value,
        }
      })
        .then(usuario => {
          if (!usuario) {
            return Promise.reject('Usuario no encontrado');
          }
        })
        .catch(() => Promise.reject('Credenciales inválidas'));
    }),

  check('pass')
    .notEmpty().withMessage('Debe ingresar contraseña')
    .custom((value, { req }) => {
      return db.Usuarios.findOne({
        where: {
          usuario: req.body.user,
        }
      })
        .then(usuario => {
            console.log(value);
          if (value !== usuario.contraseña) {
            return Promise.reject('Contraseña incorrecta');
          }
        })
        .catch(() => Promise.reject('Credenciales inválidas'));
    })
];
