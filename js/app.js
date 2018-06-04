const weatherId  = () => ({
    
    200: 'Trovoada com chuva leve',
    201: 'Trovoada com chuva',
    202: 'Trovoada com chuva pesada',
    210: 'Trovoada leve',
    211: 'Trovoada',
    212: 'Trovoada pesada',
    221: 'Tempestade Irregular',
    230: 'Tempestade Leve',
    231: 'Chuvisco com trovoadas',
    232: 'Tempestade pesada',

    300: 'Chuvisco leve',
    301: 'Chuvisco',
    302: 'Chuvisco mais intenso',
    310: 'Chuvisco mais leve',
    311: 'Pancadas de chuva',
    312: 'Pancadas de chuva intensa',
    313: 'Pancadas de chuva intensa',
    314: 'Pancadas de chuva intensa',
    321: 'Pancadas de chuva leve',

    500: 'Chuva leve',
    501: 'Chuva Moderada',
    502: 'Chuva Intensa',
    503: 'Chuva muito intensa',
    504: 'Chuva pesada',
    511: 'Chuva com risco de neve',
    520: 'Chuva de leve intensidade',
    521: 'Chuva rápida',
    522: 'Chuva rápida e intensa',
    531: 'Chuva rápida',

    600: 'Pouca neve',
    601: 'Neve',
    602: 'Neve pesada',
    611: 'Granizo',
    612: 'Granizo',
    615: 'Chuva rápida e neve',
    616: 'Chuva e neve',
    620: 'Risco de neve',
    621: 'Neve rápida',
    622: 'Neve Pesada',

    701: 'Névoa',
    711: 'Fumaça',
    721: 'Neblina',
    731: 'Redemoinho de poeira',
    741: 'Névoa',
    751: 'Areia',
    761: 'Poeira',
    762: 'Cinza Vulcânica',
    771: 'Rajadas de vento',
    781: 'Tornado',

    800: 'Céu limpo',
    801: 'Poucas nuvens',
    802: 'Nuvens dispersas',
    803: 'Nuvens quebradas',
    804: 'Nublado',

    900: 'Tornado',
    901: 'Chuva Tropical',
    902: 'Furacão',
    903: 'Frio',
    904: 'Calor',
    905: 'Ventania',
    906: 'Granizo',
    951: 'Calmo',
    952: 'Brisa leve',
    953: 'Brisa suave',
    954: 'Brisa moderada',
    955: 'Brisa fresca',
    956: 'Ventania forte',
    957: 'Ventania muito forte',
    958: 'Vendaval',
    959: 'Vendaval forte',
    960: 'Tempestade',
    961: 'Tempestade violenta',
    962: 'Furacão'

})

// Retorna o dia atual se passado nenhum parametro
// aceita nameros como parametro cada numero inserido será somado em relação ao dia de hoje
// Ex: currentDay(1) - retorna sabado caso hoje for sexta

const currentDay = (num = 0) => {
    const weekDays = ['Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado']
    const currentDay = new Date().getDay()
    return weekDays[currentDay + num] || weekDays[currentDay]
}

const get = (url, cb) => fetch(url).then(resp => resp.json()).then(cb)

const kelvinToCelsius = kelvin => Math.floor(kelvin - 273).toFixed(0)

const insertContent = $elm => content => $elm.innerHTML = content

const fetchCity = async (cityName) => {

    const KEY = 'ce5db2f0f4a2dc4ed7734ed23cc9f179'
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${KEY}`
    const URLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${KEY}`
    await get(URL, manipularDados)
    await get(URLForecast, forecast)
}

const manipularDados = (data) => {
    const $temperature = document.querySelector('[data-js="temperature"]')
    const $weather = document.querySelector('[data-js="weather"]')
    const getTemperatureID = weatherId()[data.weather[0].id]

    insertContent($temperature)(kelvinToCelsius(data.main.temp))
    insertContent($weather)(getTemperatureID)
}
       
const forecast = (arrayForecast) => {

    const $dayNameTomorrow = document.querySelector('[data-js="first-forecast-day"]')
    const $dayNameAfterTomorrow = document.querySelector('[data-js="last-forecast-day"]')

    const $forecastTomorrow = document.querySelector('[data-js="first-temp-forecast"]')
    const $forecastAfterTomorrow = document.querySelector('[data-js="last-temp-forecast"]')
    const $forecastWeatherTomorrow = document.querySelector('[data-js="first-weather-forecast"]')
    const $forecastWeatherAfterTomorrow = document.querySelector('[data-js="last-weather-forecast"]')

    $dayNameTomorrow.innerHTML = currentDay(1)
    $dayNameAfterTomorrow.innerHTML = currentDay(2)
    
    $forecastTomorrow.innerHTML = kelvinToCelsius(arrayForecast.list[4].main.temp)
    $forecastWeatherTomorrow.innerHTML = weatherId()[arrayForecast.list[4].weather['0'].id]
    
    $forecastAfterTomorrow.innerHTML = kelvinToCelsius(arrayForecast.list[12].main.temp)
    $forecastWeatherAfterTomorrow.innerHTML  = weatherId()[arrayForecast.list[12].weather['0'].id]

}

document.querySelector('.form-city').addEventListener('submit', function(e){
    e.preventDefault()

    const $inputCity = document.querySelector('[data-js="input-city"]')

    fetchCity($inputCity.value)
})