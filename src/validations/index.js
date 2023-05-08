const { check } = require('express-validator');
console.log('holaaaaaaaaaaaaaaaaaaaaa');
module.exports = [
    check('hc')
        .notEmpty().withMessage('El HC es obligatorio').bail()
        .isLength({ max: 12 }).withMessage('El HC no debe superar los 12 caracteres'),    
    check('firstname')
        .notEmpty().withMessage('El campo no puede estar vacio'),
    check('lastname')
        .notEmpty().withMessage('El campo no puede estar vacio')
]