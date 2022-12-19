/* var map = L.map('map').setView([40.42170620648475, -3.6926820312559645], 13);//vista inicial

//Cambiar capa -> en los apuntes de la clase 8
//API 
const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
//ATTRIBUTION
const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN =
  'pk.eyJ1IjoiY2Nhc3RpbGxvMDZtYiIsImEiOiJja2k1eXpybXU3em1mMnRsNjNqajJ0YW12In0.aFQJlFDBDQeUpLHT4EiRYg';
//Le pasamos los atributos a tileLayer
L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 18,
    id: 'mapbox/streets-v11',//mapbox://styles/mapbox/satellite-v9 -> cambair estilos del mapa
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
  }).addTo(map);

  //Leaflet
var marker = L.marker([40.42170620648475, -3.6926820312559645]).addTo(map);//marcador

var circle = L.circle([40.42170620648475, -3.6926820312559645], {//circulo
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([//poligono 
    [40.41953422467422, -3.688371396126684],//coordenadas vertices poligono
    [40.42077575655889, -3.680389141929812],
    [40.412345958196696, -3.6766984222473873],
    [40.4084901170388, -3.678586697433744],
    [40.40698693267239, -3.6885430575072617],
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon."); */


//Ejercicio
//1. Utiliza Leaflet para posicionarte en un mapa
/* if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(position => {
       console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);
      let datos = `<h1>Aquí estás!</h1>
      <p>Lat: ${position.coords.latitude.toFixed(4)}</p>
      <p>Long: ${position.coords.longitude.toFixed(4)}</p>`
      document.body.innerHTML = datos;
  });
} else {
console.warn("Tu navegador no soporta Geolocalización!! ");
} -> con esto sacamos nuestras coordenadas */
var map = L.map('map').setView([34.044796015132725, -118.27767049252212], 13);//vista inicial

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//2. Posicionar el transporte público (trenes y autobuses) de Los Angeles en el mapa. 🎉 🚌 🚊


async function buscarVehiculos() {
  const respuesta = await fetch("https://api.metro.net/LACMTA/vehicle_positions/all")
  const vehiculos = await respuesta.json()
  for (let i = 0;  i < vehiculos.length; i++) {
    const posicionLat = await vehiculos[i].position.latitude
    const posicionLon = await vehiculos[i].position.longitude
    const vehiculo = await vehiculos[i].vehicle.vehicle_id
   /*  console.log(posicionLat)
    console.log(posicionLon) */
    console.log(vehiculo)

    const marker = L.marker([posicionLat, posicionLon]).addTo(map);//marcador
    marker.bindPopup(`${vehiculo}`).openPopup();
    
  }



 
}

buscarVehiculos()



  

function repetirCadaSegundo() {
  let identificadorIT
  identificadorIT = setInterval(buscarVehiculos, 80000);
}

repetirCadaSegundo() 





/* [
  {
    "current_status": "IN_TRANSIT_TO",
    "stop_id": "5146",
    "geometry": {
      "type": "Point",
      "coordinates": [
        -118.26107025146484,
        34.03708267211914
      ]
    },
    "timestamp": 1671462039,
    "current_stop_sequence": 15,
    "agency_id": "LACMTA",
    "trip": {
      "trip_id": "10030007770632-DEC22",
      "route_id": "30-13167",
      "trip_start_date": "20221219"
    },
    "vehicle": {
      "vehicle_id": "5816",
      "vehicle_label": "5816"
    },
    "position": {
      "latitude": 34.03708267211914,
      "longitude": -118.26107025146484,
      "bearing": 301.8064880371094,
      "speed": 7.867904186248779
    }
  },] */