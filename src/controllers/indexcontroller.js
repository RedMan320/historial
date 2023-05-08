const fs = require('fs');
const path = require('path');
const historiasClinicasPath = path.join(__dirname, '../data/historiasClinicas.json');
const historiasClinicas = JSON.parse(fs.readFileSync(historiasClinicasPath, 'utf-8'));
const {validationResult} = require('express-validator');
const { log } = require('console');
module.exports = {
  index: (req, res, next) => {
    res.render("index", {
        title: "Archivo" 
    });
  },
  addHc: (req, res, next) => {
    console.log(req, "principio controler");
    const { hc, firstname, lastname, lastAppointment, box, _startTime } = req.body
    historiasClinicas.push({
      hc,
      firstname,
      lastname,
      lastAppointment,
      box,
      _startTime
    });
    fs.writeFileSync(historiasClinicasPath, JSON.stringify(historiasClinicas, null, 2));
    res.redirect('/');
  }
};
