const fs = require('fs');
const path = require('path');
/* const HistoriasClinicasPath = path.join(__dirname, '../data/HistoriasClinicas.json');
const HistoriasClinicas = JSON.parse(fs.readFileSync(HistoriasClinicasPath, 'utf-8')); */
const { validationResult } = require('express-validator');

const { HistoriasClinicas, Cajas, Personas, Usuarios } = require('../database/models');
const capitalizarPrimeraLetra = require('../utils/capitalizeOneLetter')
const obtenerNumeros = require('../utils/obtenerNumero')
const obtenerFecha = require('../utils/obtenerFecha');
const { log } = require('console');

module.exports = {
  error: (req, res, next) => {
    if (res.status(404)) {
      res.render('index', {
        mensaje: 'Pagina no enconetrada'
      })
    }
  },
  index: (req, res, next) => {
    const errors = validationResult(req);
    const url = req.url
    console.log(url);
    res.render("index", {
      title: "Archivo",
      errors,
      recordCreated: false
    });
  },
  addHc: async (req, res, next) => {
    const errors = validationResult(req);
    const { hc, firstname, lastAppointment, lastname, box } = req.body;
    const ultimoRegistro = new Date(lastAppointment)
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
          apellido: lastname.trim(),
          dni: obtenerNumeros(hc)
        });
        const personaId = persona.id;

        await HistoriasClinicas.create({
          hc: hc.trim(),
          ultimoRegistro: ultimoRegistro.setDate(ultimoRegistro.getDate() + 1),
          personaId: personaId,
          cajaId: cajaId
        });

        return res.render("index", {
          title: "Archivo",
          errors: errors.mapped(),
          req: req.body,
          recordCreated: true
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
        req: req.body,
        recordCreated: false
      });
    }
  },
  listado: async (req, res) => {
    try {
      const url = req.url
      const historias = await HistoriasClinicas.findAll({
        include: ['persona', 'caja'],
        order: [['id', 'desc']]
      });
      res.render('listado', {
        title: 'Listado',
        historias,
        capitalizarPrimeraLetra,
        obtenerNumeros,
        obtenerFecha
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos del listado');
    }
  },
  paciente: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const url = req.url
      const paciente = await HistoriasClinicas.findByPk(req.params.id, {
        include: ['persona', 'caja']
      });
      if (paciente) {
        /* res.send(paciente); */
        res.render("paciente", {
          title: "paciente",
          errors,
          historia: paciente,
          capitalizarPrimeraLetra,
          obtenerNumeros,
          obtenerFecha
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: (req, res) => {
    res.render("login", {
      title: "Iniciar Sesión"
    })
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const usuario = req.body.user.trim()
      console.log(usuario);
      Usuarios.findOne({
        where: {
          usuario
        }
      })
        .then(usuario => {
          req.session.userLogin = {
            id: usuario.id,
            usuario: usuario.usuario
          }
          res.cookie("recordarme", req.session.userLogin, { maxAge: 1000 * 60 })
          /* if (recordar) {
              res.cookie("recordarme", req.session.userLogin, { maxAge: 1000 * 60 })
          } */
          return res.redirect('/login')
        })
        .catch(error => console.log(error))

    } else {
      return res.render('login', {
        title: 'Iniciar Sesión',
        errors: errors.mapped()
      })
    }
  },
  destroy: (req, res) =>{
    let errors = validationResult(req);
  },
  destroyOld: (req, res) => {
    const id = req.params.id;
    console.log(req.params);
  
    // Eliminar HistoriasClinicas
    HistoriasClinicas.destroy({
      where: {
        id: id
      }
    })
      .then(() => {
        // Eliminar Cajas
        return Cajas.destroy({
          where: {
            id: id
          }
        });
      })
      .then(() => {
        // Eliminar Personas
        return Personas.destroy({
          where: {
            id: id
          }
        });
      })
      .then(() => {
        // Todas las eliminaciones se realizaron correctamente
        res.redirect('/listado');
      })
      .catch((error) => {
        // Manejar el error si ocurre alguna falla en las eliminaciones
        console.error(error);
        res.status(500).send('Error al eliminar los registros');
      });
  }
  
}

