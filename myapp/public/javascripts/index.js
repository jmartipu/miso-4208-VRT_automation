
function crearReporte() {
    const Http = new XMLHttpRequest();
    const url='/reporte/';
    Http.open("GET", url);
    Http.send();
}
