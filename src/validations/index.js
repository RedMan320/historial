const { check } = require('express-validator');

module.exports = [
    check('hc')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('La historia clinica es obligatoria').bail()
        .isLength({ max: 20 }).withMessage('La historia clinica no debe superar los 20 caracteres')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('La historia clinica solo debe contener letras y números'),    
    check('firstname')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El nombre no debe estar vacio').bail()
        .matches(/^[a-zA-Z ]+$/).withMessage('El nombre solo debe contener letras'),
    check('lastname')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El apellido no debe estar vacio').bail()
        .matches(/^[a-zA-Z ]+$/).withMessage('El apellido solo debe contener letras'),
    check('lastAppointment')
        .notEmpty().withMessage('La fecha es obligatoria').bail()
        .isDate().withMessage('La fecha debe ser valida'),
    check('box')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El numero de caja es obligatorio').bail()
        .matches(/^[a-zA-Z0-9]+$/).withMessage('El numero de caja solo debe contener letras y números'),
]