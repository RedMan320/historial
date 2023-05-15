var express = require('express');
var router = express.Router();
const {index, addHc, listado} = require('../controllers/indexcontroller.js');
const Validations = require('../validations/index.js')

/* GET home page. */
router.get('/', index);
router.post('/', Validations, addHc);
router.get('/listado', listado)


module.exports = router;
