const fs = require('fs');
const path = require('path');
const historiasClinicasPath = path.join(__dirname, '../data/historiasClinicas.json');
const historiasClinicas = JSON.parse(fs.readFileSync(historiasClinicasPath, 'utf-8'));
const {validationResult} = require('express-validator');
const { log } = require('console');
module.exports = {
  index: (req, res, next) => {
    res.render("index", {
        title: "Archivo",
        req: req.body
    });
  },
  addHc: (req, res, next) => {
    const errors = validationResult(req)
    const { hc, firstname, lastname, lastAppointment, box } = req.body
    if (errors.isEmpty()){
      historiasClinicas.push({
        hc,
        firstname,
        lastname,
        lastAppointment,
        box
      });
      fs.writeFileSync(historiasClinicasPath, JSON.stringify(historiasClinicas, null, 2));
      res.redirect('/')
    } else {
      console.log(errors);
      res.redirect('/');
    }
  }
};
