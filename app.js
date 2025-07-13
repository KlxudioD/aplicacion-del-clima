

let ciudadEntrada = document.getElementById('ciudadEntrada');
let btnBuscar = document.getElementById('botonBusqueda');
let resultadosClima = document.getElementById('datosClima');
let api_key = '52f047e6f8784df0a925e8ed8d8e0a06';
let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
let difKelvin = 273.15;


const buscarCiudad = () => {

    btnBuscar.addEventListener('click', () => {

        let ciudad = ciudadEntrada.value;

        if (ciudad === '') {
            resultadosClima.textContent = "Por favor, ingresa una ciudad";
            return;
        }
        fetchDatosClima(ciudad);

    })
};

const fetchDatosClima = async (ciudad) => {

    try {
        const respuesta = await fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`);

        if (!respuesta.ok) {
            throw new Error("Error al encontrar datos del clima");
        }

        const data = await respuesta.json();
        mostrarResultados(data);
    } catch (error) {
        resultadosClima.textContent = error.message;

    }

};

const mostrarResultados = (data) => {
    const divDatos = resultadosClima;
    divDatos.innerHTML = "";

    const ciudadNombre = data.name;
    const pais = data.sys.country;
    const ciudadTemp = parseInt(data.main.temp - difKelvin.toFixed(1));
    const ciudadDescrip = data.weather[0].description
    const ciudadHumedad = data.main.humidity;
    const icon = data.weather[0].icon;
    const iconoUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const titulo = document.createElement("h2");
    titulo.textContent = `${ciudadNombre}, ${pais}`;

    const imagen = document.createElement("img");
    imagen.src = iconoUrl;
    imagen.alt = "icono del clima";

    const temperatura = document.createElement("p");
    temperatura.innerHTML = `<strong>Temperatura:</strong> ${ciudadTemp}°C`;

    const descripcion = document.createElement("p");
    descripcion.innerHTML = `<strong>Clima:</strong> ${ciudadDescrip}`;

    const humedad = document.createElement("p");
    humedad.innerHTML = `<strong>Humedad:</strong> ${ciudadHumedad}%`;


    resultadosClima.appendChild(titulo);
    resultadosClima.appendChild(imagen);
    resultadosClima.appendChild(temperatura);
    resultadosClima.appendChild(descripcion);
    resultadosClima.appendChild(humedad);

}
buscarCiudad();




























