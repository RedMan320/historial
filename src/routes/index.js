var express = require('express');
var router = express.Router();
const {index, addHc} = require('../controllers/indexcontroller.js');

/* GET home page. */
router.get('/', index);
router.post('/', addHc);


module.exports = router;
