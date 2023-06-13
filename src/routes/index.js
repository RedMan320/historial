var express = require('express');
var router = express.Router();
const {index, addHc, listado, paciente, login, processLogin, destroy, logout,processEdit, edit} = require('../controllers/indexcontroller.js');
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
router.get('/logout',logout)
router.put('/hc/delete/:id',loginCheck, destroy);
router.get('/hc/edit/:id', edit);
router.put('/hc/edit/:id', processEdit);


module.exports = router;
