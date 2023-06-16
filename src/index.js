const apiKey = '478de676b73f4e1bafa3f6642o5043et';
let units = 'metric';
let city = 'tehran';
let temp = 0;
let isCelsius = true;

const capitalize = (string) => {
  string = string.toLowerCase().trim();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const showTemprature = (response) => {
  let tempElement = document.querySelector('#temp');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let header = document.querySelector('h1');
  let descElement = document.querySelector('#description');
  let iconElement = document.querySelector('#icon');

  let city = response.data.city;
  temp = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.condition.description;
  let icon = response.data.condition.icon_url;

  header.innerHTML = city;
  descElement.innerHTML = description;
  tempElement.innerHTML = temp;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  iconElement.setAttribute('src', icon);
};

const search = (cityName) => {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemprature);
};

const handleSumbit = (e) => {
  e.preventDefault();
  isCelsius = true;
  celsius.classList.remove('active');
  fahrenheit.classList.add('active');
  let searchCity = capitalize(document.querySelector('#search-value').value);
  search(searchCity);
};

const celsiusToFahrenheit = (c) => {
  let f = Math.round(c * (9 / 5) + 32);
  return f;
};

const fahrenheitToCelsius = (f) => {
  let c = Math.round(((f - 32) * 5) / 9);
  return c;
};

const changeToFahrenheit = () => {
  let tempElement = document.querySelector('#temp');

  if (isCelsius) {
    tempElement.innerHTML = celsiusToFahrenheit(temp);
    temp = celsiusToFahrenheit(temp);
    isCelsius = false;
    fahrenheit.classList.remove('active');
    celsius.classList.add('active');
  } else return;
};

const changeToCelsius = () => {
  let tempElement = document.querySelector('#temp');

  if (!isCelsius) {
    tempElement.innerHTML = fahrenheitToCelsius(temp);
    temp = fahrenheitToCelsius(temp);
    isCelsius = true;
    celsius.classList.remove('active');
    fahrenheit.classList.add('active');
  } else return;
};

let celsius = document.querySelector('#celsius');
let fahrenheit = document.querySelector('#fahrenheit');

fahrenheit.addEventListener('click', changeToFahrenheit);
celsius.addEventListener('click', changeToCelsius);

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSumbit);

search(city);
