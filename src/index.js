const _ = require('lodash'); //se está importando y diciendo de donde viene el _
const { Chart, registerables } = require('chart.js'); //importa la librería para construir el gráfico
Chart.register(...registerables);
const datos = require('./datosGraf.csv'); //trae el archivo datosGraf
const imagenEnc = require('./climaE.png'); //trae la imagen climaE
const estilo =require('./estilo.scss'); //trae el archivo estilo.scss
const json5 = require('./datos.json5'); //trae el archivo datos.json5
const imagenCli = require('./nublado.jpg'); //trae el archivo nublado.jpg
const yaml = require('./datos.yaml'); //trae el archivo datos.yaml

//se registra el serviceWorker para usar el caché
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./service-worker.js').then(registration =>{
      console.log("SW registrado", registration);
    }).catch(err=>{
      console.log("SW no registrado", err);
    });
  });
}

//genera el encabezado
function crearEncabezado(){
    const encabezado = document.createElement('div');
    encabezado.innerHTML = `<div class="header-container">
                                <div class="col-izquierda">
                                    <img src="${imagenEnc}" alt="Logo">
                                </div>
                                <div class="col-derecha">
                                    <h2>El clima en tu ciudad</h2>
                                </div>
                              </div>`;
    encabezado.className='encabezado';
    return encabezado;
}

//genera la tarjeta
function crearTarjeta(){
    const elemento = document.createElement('div');
    elemento.innerHTML = `    
            <div class="card-content">
              <table>
                <tr>
                  <td><h1>${yaml.title}</h1> 
                    <img src=${imagenCli}>  
                    <h3>${json5.owner.fe}</h3>
                  </td>
                  <td>
                    <p>Temperatura: <strong>${json5.owner.temperature}°C</strong></p>
                    <p>Clima: <strong>${json5.owner.description}</strong></p>
                  </td>
                </tr>
              </table>    
            </div>`;
    elemento.className='card';
    return elemento;
}

//genera la tabla
function crearTabla(){
    const elemento = document.createElement('table');
    elemento.className="tabla";
    elemento.innerHTML = `
  <thead>
    <tr>
      <th>Día</th>
      <th>Pronóstico</th>
      <th>Temp. (Máx/Mín)</th>
      <th>Humedad</th>
      <th>Viento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Lunes</strong></td>
      <td>☀️ Soleado</td>
      <td>28°C / 16°C</td>
      <td>40%</td>
      <td>12 km/h</td>
    </tr>
    <tr>
      <td><strong>Martes</strong></td>
      <td>🌧️ Lluvia débil</td>
      <td>22°C / 14°C</td>
      <td>75%</td>
      <td>18 km/h</td>
    </tr>
    <tr>
      <td><strong>Miércoles</strong></td>
      <td>⛅ Parcialmente nublado</td>
      <td>25°C / 15°C</td>
      <td>50%</td>
      <td>10 km/h</td>
    </tr>
    <tr>
      <td><strong>Jueves</strong></td>
      <td>⛈️ Tormenta</td>
      <td>20°C / 12°C</td>
      <td>85%</td>
      <td>25 km/h</td>
    </tr>
    <tr>
      <td><strong>Viernes</strong></td>
      <td>💨 Ventoso</td>
      <td>24°C / 13°C</td>
      <td>35%</td>
      <td>30 km/h</td>
    </tr>
  </tbody>
    `;
    return elemento;
}

// genera el gráfico
function crearGrafico(){
    const elemento = document.createElement('div');
    const divGraf = document.createElement('canvas'); // en este se inserta el gráfico
    new Chart(divGraf,{
    type: 'line',
    data:{
        labels: datos[0], //la info está en el archivo datosGraf
        datasets: [{
            label: 'Temperatura',
            data: datos[1], //la info está en el archivo datosGraf
            backgroundColor: '#ebe498', //color del centro de los puntos
            borderColor: '#f2e01b', //color de la línea principal
            borderWidth: 2, //ancho de línea
            pointerBorderColor: '#ebe498', //color de borde de los puntos
            pointRadius: 3,
            fill: true //relleno
        }]
    }
});
elemento.appendChild(divGraf);
return elemento;
}

//se crea un div contenedor
function crearContenedor(){
    const contenedor = document.createElement("div");
    contenedor.id = "contenedor-principal";
    return contenedor;
}

//en el div contenedor van la tarjeta y la tabla
const miContenedor= crearContenedor();
miContenedor.appendChild(crearTarjeta());
miContenedor.appendChild(crearTabla());

//se agregan el encabezado, el contenedor y el gráfico
document.body.appendChild(crearEncabezado());
document.body.appendChild(miContenedor);
document.body.appendChild(crearGrafico());

