const apiKey = 'b70ee57c3c80ad353268cc880561796d';
let units = 'metric';

const capitalize = (string) => {
  string = string.toLowerCase().trim();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const showTemprature = (response) => {
  console.log(response.data);
  let tempElement = document.querySelector('#temp');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let header = document.querySelector('h1');
  let descElement = document.querySelector('#description');

  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.weather[0].description;

  header.innerHTML = city;
  descElement.innerHTML = description;
  tempElement.innerHTML = temp;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
};

const showCityWeather = (e) => {
  e.preventDefault();
  let searchCity = capitalize(document.querySelector('#search-value').value);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemprature);
};

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', showCityWeather);
