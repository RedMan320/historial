const fs = require('fs');
const path = require('path');
/* const historiasClinicasPath = path.join(__dirname, '../data/historiasClinicas.json');
const historiasClinicas = JSON.parse(fs.readFileSync(historiasClinicasPath, 'utf-8')); */
const {validationResult} = require('express-validator');

const {HistoriasClinicas, Cajas, Personas} = require('../database/models');


module.exports = {
  index: (req, res, next) => {
    res.render("index", {
        title: "Archivo"
    });
  },
  addHc: async (req, res, next) => {
    const errors = validationResult(req);
    const { hc, firstname, lastname, lastAppointment, box } = req.body;
  
    if (errors.isEmpty()) {
      try {
        // Obtener el id de la caja
        const caja = await Cajas.create({
          codigoBarras: box.trim()
        });
        const cajaId = caja.id;
  
        // Obtener el id de la persona
        const persona = await Personas.create({
          nombre: firstname.trim(),
          apellido: lastname.trim()
        });
        const personaId = persona.id;
  
        const historiasClinicas = await HistoriasClinicas.create({
          hc: hc.trim(),
          ultimoRegistro: lastAppointment,
          personaId: personaId,
          cajaId: cajaId
        });
  
        return res.render("index", {
          title: "Archivo",
          errors: errors.mapped(),
          req: req.body
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send("Error al crear los registros en la base de datos");
      }
    } else {
      console.log(errors);
      return res.render("index", {
        title: "Archivo",
        errors: errors.mapped(),
        req: req.body
      });
    }
  },
  listado: async (req, res) => {
    try {
      const historiasClinicas = await historiasClinicas.findAll();
      res.render('listado', {
        title: 'Listado',
        historiasClinicas
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos del listado');
    }
  }
  
  
};
