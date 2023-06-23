const fs = require('fs');
const path = require('path');
const datosPath = path.join(__dirname, '../Historial/datos.txt');

module.exports = (req, res, next) => {
  const url = req.url;
  const metodo = req.method;
  const usuarioWindows = process.env.USERNAME;
  const fechaHora = new Date().toLocaleString();

  const data = `${url}|${metodo}|${usuarioWindows}|${fechaHora}\n`;

  fs.appendFileSync(datosPath, data);
  next();
};
