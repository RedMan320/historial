const mesNumerico = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11
  };
  
  const ultimosRegistros = document.querySelectorAll('#ultimoRegistro');
  
  window.addEventListener('load', () => {
    ultimosRegistros.forEach(registro => {
      const fechaTexto = registro.textContent;
      const fechaParseada = parsearFecha(fechaTexto);
      const fechaLimite = new Date();
      fechaLimite.setFullYear(fechaLimite.getFullYear() - 10);
      if (fechaParseada < fechaLimite) {
        registro.parentNode.style.backgroundColor = '#dc3545'
      }
    });
  });
  
  function parsearFecha(fechaTexto) {
    const partes = fechaTexto.split(' de ');
    const dia = parseInt(partes[0], 10);
    const mes = mesNumerico[partes[1].toLowerCase()];
    const anio = parseInt(partes[2], 10);
    return new Date(anio, mes, dia);
  }
  