var express = require('express');
var router = express.Router();
const {index, addHc} = require('../controllers/indexcontroller.js');
const Validations = require('../validations/index.js')

/* GET home page. */
router.get('/', Validations, index);
router.post('/', Validations, addHc);


module.exports = router;
