var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(``, { title: 'Crear Reporte' });
});
router.get('/reporte/', function(req, res, next) {
    console.log("llamado");
    crearReporte();
});
module.exports = router;



function crearReporte() {
  var npm = require('npm');
  npm.command.run('test', (err) => { console.log(err) });
  generarReporte(process.cwd() + "/cypress/screenshots/1.1.TallerVRTScreenshot.js/Antes.png", process.cwd() + "/cypress/screenshots/1.1.TallerVRTScreenshot.js/Despues.png");
}

function generarReporte(file1source, file2source){
    var resemblejs = require('resemblejs');
    var fs = require('fs');
    var file1 = fs.readFileSync(file1source);
    var file2 = fs.readFileSync(file2source);
    resemblejs(file1).compareTo(file2).onComplete(function(data){
    var fecha = new Date();
    console.log(data);
    var html = `
    <html>
    <head>
        <title>Reporte Imágenes</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        
    </head>
    <body>
        <div >
        <h3 class="h3">Reporte Imágenes</h3></div>
        <h4><small class="text-muted">${fecha.toLocaleDateString() + fecha.toLocaleTimeString()}</small></h4>
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <div class="card" style="width: 20rem;">
                          <div class="card-body">
                            <h5 class="card-title">Imagen Base</h5>
                            <img src="${file1source}" class="card-img-top" alt="...">
                            
                          </div>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="card" style="width: 20rem;">
                          <div class="card-body">
                            <h5 class="card-title">Imagen Comparación</h5>
                            <img src="${file2source}" class="card-img-top" alt="...">
                          </div>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="card" style="width: 18rem;">
                          <div class="card-body">
                            <h5 class="card-title">Resultado</h5>
                            <h6 class="card-subtitle mb-2 text-muted">isSameDimensions:</h6>
                            <p class="card-text">${data.isSameDimensions}</p>
                            <h6 class="card-subtitle mb-2 text-muted">misMatchPercentage:</h6>
                            <p class="card-text">${data.misMatchPercentage}</p>
                            <h6 class="card-subtitle mb-2 text-muted">analysisTime:</h6>
                            <p class="card-text">${data.analysisTime}</p>
                          </div>
                        </div>
                    </div>
                </div>
            </table>
        </div>
    </body>
    </html>
    `;

    fs.writeFile("reporte.html", html, function(err) {

        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
	return html});
}

function getDate(fecha){
    let now = fecha;
    let date = now.toUTCString().substr(5,4)
        + now.toLocaleDateString().substr(3,2).replace("/", "")
        + now.toLocaleDateString().substr(0,2)
        + "_" + now.toLocaleTimeString();
    return date;
}