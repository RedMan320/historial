const { validationResult } = require('express-validator');
const {
  HistoriasClinicas,
  Cajas,
  Personas,
  Usuarios,
} = require('../database/models');
const capitalizeLetter = require('../utils/capitalizeLetter');
const parceNum = require('../utils/parceNum');
const parceDate = require('../utils/parceDate');
const { Op } = require('sequelize');

module.exports = {
  error: (req, res) => {
    if (res.status(404)) {
      res.render('index', {
        message: 'Pagina no encontrada',
      });
    }
  },
  index: (req, res) => {
    const errors = validationResult(req);
    res.render('index', {
      title: 'Archivo',
      errors,
      recordCreated: false,
      valuesErrors: '',
    });
  },
  addHc: async (req, res) => {
    const errors = validationResult(req);
    const { hc, firstname, lastAppointment, lastname, box } = req.body;
    const lastAppointmentDate = new Date(lastAppointment);
    if (errors.isEmpty()) {
      try {
        // Obtener el id de la caja
        const boxDataBase = await Cajas.create({
          codigoBarras: box.trim(),
        });
        const boxId = boxDataBase.id;

        // Obtener el id de la persona
        const person = await Personas.create({
          nombre: firstname.trim(),
          apellido: lastname.trim(),
          dni: parceNum(hc),
        });
        const personId = person.id;

        await HistoriasClinicas.create({
          hc: hc.trim(),
          lastAppointmentDate: lastAppointmentDate.setDate(lastAppointmentDate.getDate()),
          personaId: personId,
          cajaId: boxId,
          vigente: 1,
        });

        return res.render('index', {
          title: 'Archivo',
          errors: errors.mapped(),
          req: req.body,
          recordCreated: true,
        });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .send('Error al crear los registros en la base de datos');
      }
    } else {
      console.error(errors);
      return res.render('index', {
        title: 'Archivo',
        errors: errors.mapped(),
        req: req.body,
        recordCreated: false,
      });
    }
  },
  historias: async (req, res) => {
    try {
      let { draw, length, start, search } = req.query

      let options = {
        offset: +start,
        limit: +length,
        order: [['id', 'desc']],
        include: ['persona', 'caja'],
        where: {
          hc: {
            [Op.substring]: search.value
          }
        }
      }
      const { count, rows } = await HistoriasClinicas.findAndCountAll(options);
      const data = {
        draw: draw,
        iTotalDisplayRecords: count,
        iTotalRecords: count,
        data: rows
      }
      return res.json(data)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener datos de la base');
    }
  },
  listado: async (req, res) => {
    res.render('listado', {
      title: 'Listado',
      capitalizeLetter,
      parceNum,
      parceDate,
    });
  },
  paciente: async (req, res) => {
    try {
      const errors = validationResult(req);
      const pacient = await HistoriasClinicas.findByPk(req.params.id, {
        include: ['persona', 'caja'],
      });
      if (!pacient || pacient.vigente === 0) {
        res.redirect('/listado');
      } else {
        /* res.send(pacient) */
        res.render('paciente', {
          title: 'Paciente',
          errors,
          historia: pacient,
          capitalizeLetter,
          parceNum,
          parceDate,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },

  login: (req, res) => {
    res.render('login', {
      title: 'Iniciar Sesión',
    });
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const user = req.body.user.trim();
      Usuarios.findOne({
        where: {
          user,
        },
      })
        .then((user) => {
          req.session.userLogin = {
            id: user.id,
            usuario: user.usuario,
          };
          res.cookie('recordarme', req.session.userLogin, {
            maxAge: 1000 * 60,
          });
          /* if (recordar) {
              res.cookie('recordarme', req.session.userLogin, { maxAge: 1000 * 60 })
          } */
          return res.redirect('/listado');
        })
        .catch((error) => console.error(error));
    } else {
      return res.render('login', {
        title: 'Iniciar Sesión',
        errors: errors.mapped(),
      });
    }
  },
  destroy: (req, res) => {
    HistoriasClinicas.update(
      {
        vigente: 0,
      },
      {
        where: { id: req.params.id },
      }
    )
      .then(() => {
        return res.redirect('/listado');
      })
      .catch((error) => console.error(error));
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie('recordarme', null, { MaxAge: -1 });
    res.redirect('/');
  },
  edit: async (req, res) => {
    try {
      const errors = validationResult(req);
      const pacient = await HistoriasClinicas.findByPk(req.params.id, {
        include: ['persona', 'caja'],
      });
      if (!pacient || pacient.vigente === 0) {
        res.redirect('/listado');
      } else {
        /* res.send(pacient) */
        res.render('edit', {
          title: 'Editar',
          errors,
          historia: pacient,
          capitalizeLetter,
          parceNum,
          parceDate,
          recordCreated: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  processEdit: async (req, res) => {
    const { hc, firstname, lastname, lastAppointment, box } = req.body;
    const lastAppointmentDate = new Date(lastAppointment);
    try {
      /* res.send(req.body) */
      await HistoriasClinicas.update(
        {
          hc: hc.trim(),
          lastAppointmentDate: lastAppointmentDate.setDate(lastAppointmentDate.getDate() + 1),
        },
        {
          where: { id: req.params.id },
        }
      );
      await Cajas.update(
        {
          codigoBarras: box.trim(),
        },
        {
          where: { id: req.params.id },
        }
      );
      await Personas.update(
        {
          nombre: firstname.trim(),
          apellido: lastname.trim(),
        },
        {
          where: { id: req.params.id },
        }
      ).then(() => {
        return res.redirect('/hc/' + req.params.id);
      });
    } catch (error) {
      console.error(error);
    }
  },
};
