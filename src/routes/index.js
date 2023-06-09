var express = require('express');
var router = express.Router();
const {index, addHc, listado, paciente, login, processLogin, destroy} = require('../controllers/indexcontroller.js');
const Validations = require('../validations/index.js')
const ValidationsLogin = require('../validations/login.js')
const loginCheck = require('../middleware/loginCheck');
/* GET home page. */
router.get('/', index);
router.post('/', Validations, addHc);
router.get('/listado', listado)
router.get('/hc/:id', paciente)
router.get('/login', login);
router.post('/login', ValidationsLogin, processLogin);
router.put('/edit/:id', destroy);


module.exports = router;
