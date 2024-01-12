const capitalizarPalabras = (str) => {
    const palabras = str.split(' ');
    const resultado = palabras.map((palabra) => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    });
    return resultado.join(' ');
};

const formatearFecha = (fechaISO) => {
    // Crear un objeto Date con la fecha
    const fecha = new Date(fechaISO);

    // Obtener día, mes y año
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1; // Sumar 1 porque los meses comienzan desde 0
    const ano = fecha.getUTCFullYear();

    // Formatear la fecha como 'dd/mm/yyyy'
    const fechaFormateada = (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + ano;
    return fechaFormateada

}

let dataTable;
let dataTableInitialized = false;


const dataTableOptions = {
    ajax: {
        url: '../../src/controllers/historias.php',
        dataSrc: '', // Propiedad que contiene los datos en la respuesta
    },
    columns: [
        { data: 'hc' },
        { data: 'ultimoRegistro', render: (data) => formatearFecha(data) },
        { 
            data: 'persona', 
            render: (data) => {
                return capitalizarPalabras(data.nombre) + ' ' + capitalizarPalabras(data.apellido);
            }
        },
        { data: null, render: (data) => `<a href="/hc/${data.id}"><i class="fa-solid fa-circle-info"></i></a>` },
    ],
    lengthMenu: [10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: 'centered', targets: [0, 1, 2, 3] },
        { orderable: false, targets: [3] },
        { searchable: false, targets: [3] }
    ],
    pageLength: 10,
    language: {
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'Ninguna historia encontrada',
        info: 'Mostrando de _START_ a _END_ de _TOTAL_ registros',
        infoEmpty: '',
        infoFiltered: '(filtrados desde _MAX_ registros totales)',
        search: 'Buscar:',
        loadingRecords: 'Cargando...',
        paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior'
        }
    },
};


const initDataTable = () => {
    // ... existing initialization code ...

    dataTable = $('#datatable_historias').DataTable(dataTableOptions);

    // Add a click event listener for the action links
    $('#datatable_historias tbody').on('click', 'a', function() {
        const hcId = $(this).data('id');  // Extract the ID from the link
        window.location.href = `/hc/${hcId}`;  // Redirect to the appropriate page
    });
};

window.addEventListener('load', () => {
    initDataTable();
});