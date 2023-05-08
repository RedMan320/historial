const fs = require('fs');
const path = require('path');
const historiasClinicasPath = path.join(__dirname, '../data/historiasClinicas.json');
const historiasClinicas = JSON.parse(fs.readFileSync(historiasClinicasPath, 'utf-8'));
module.exports = {
  index: (req, res, next) => {
    res.render("index", {
        title: "Archivo" 
    });
  },
  addHc: (req, res, next) => {
    const { hc, firstname, lastname, lastAppointment, box } = req.body
    historiasClinicas.push({
      hc,
      firstname,
      lastname,
      lastAppointment,
      box
    });
    fs.writeFileSync(historiasClinicasPath, JSON.stringify(historiasClinicas, null, 2));
		res.redirect('/');
  }
};
