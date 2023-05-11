const { check } = require('express-validator');

module.exports = [
    check('hc')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('La historia clinica es obligatoria').bail()
        .isLength({min: 4, max: 20}).withMessage('La historia clinica debe tener entre 4 y 20 caracteres')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('La historia clinica solo debe contener letras y números'),    
    check('firstname')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El nombre no debe estar vacio').bail()
        .isLength({min: 4, max: 20}).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-Z]+$/).withMessage('El nombre solo debe contener letras'),
    check('lastname')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El apellido no debe estar vacio').bail()
        .isLength({min: 4, max: 20}).withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-Z]+$/).withMessage('El apellido solo debe contener letras'),
    check('lastAppointment')
        .notEmpty().withMessage('La fecha es obligatoria').bail()
        .isDate().withMessage('La fecha debe ser valida'),
    check('box')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El numero de caja es obligatorio').bail()
        .isLength({min: 4, max: 20 }).withMessage('La caja debe tener entre 4 y 20 caracteres')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('El numero de caja solo debe contener letras y números'),
]