/* const fetch = require('isomorphic-fetch');
const { parseStringPromise } = require('xml2js');

const API_URL = 'http://172.20.20.47/ws-salud/WebService.asmx/ObtenerPaciente?TipoDocumento=1&NumeroDocumento=40306332'

const options = {
  method: 'GET'
};

async function fetchData() {
  try {
    const response = await fetch(API_URL, options);
    const result = await response.text();
    const parsedResult = await parseStringPromise(result);
    const prueba = parsedResult;
    console.log(prueba); 
    if (personas) {
      personas.forEach(paciente => {
        console.log('Apellido:', paciente.Apellido[0]);
        console.log('Nombre:', paciente.Nombre[0]);
        console.log('Fecha de Nacimiento:', paciente.FechaNacimiento[0]);
        console.log('Nacionalidad:', paciente.Nacionalidad[0]);
        console.log('Calle:', paciente.Calle[0]);
        console.log('Localidad:', paciente.Localidad[0]);
        console.log('Partido:', paciente.Partido[0]);
        console.log('Código Postal:', paciente.CodigoPostal[0]);
        console.log('Obra Social:', paciente.DescripcionOS[0]);
      });
    }
    
  } catch (error) {
    console.error(error);
  }
}

fetchData();
 */

const axios = require('axios');

const url = 'http://172.20.20.47/ws-salud/WebService.asmx/ObtenerPaciente';
const tipoDocumento = '1';
const numeroDocumento = '40306332';

axios.get(url, {
  params: {
    TipoDocumento: tipoDocumento,
    NumeroDocumento: numeroDocumento
  }
})
  .then(response => {
    const xmlData = response.data;
    // Procesar la respuesta XML según tus necesidades
    console.log(xmlData);
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
  });
