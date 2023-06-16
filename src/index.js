const apiKey = '478de676b73f4e1bafa3f6642o5043et';
let units = 'metric';
let city = 'tehran';

const capitalize = (string) => {
  string = string.toLowerCase().trim();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (dt) => {
  date = new Date(dt * 1000);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];
  let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

  return `${day} ${hour}:${minutes}`;
};

const formatDay = (dt) => {
  date = new Date(dt * 1000);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day = days[date.getDay()];
  return day;
};

const showForecast = (response) => {
  let forecasts = response.data.daily;
  let forecastElement = document.querySelector('#forecast');
  let forecastHtml = '';
  forecasts.forEach((forecast, index) => {
    if (index < 6) {
      forecastHtml += `
      <div class="col-2 text-center">
        <strong class="text-secondary">${formatDay(forecast.time)}</strong>
        <div><img src=${forecast.condition.icon_url} alt=${
        forecast.condition.description
      } title=${forecast.condition.icon}></div>
        <div class="d-flex justify-content-evenly">
          <span id="max">${Math.round(forecast.temperature.maximum)}°</span>
          <span id="min" class="text-secondary">${Math.round(
            forecast.temperature.minimum
          )}°</span>
        </div>
      </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
};

const forecast = (coord) => {
  let lat = coord.latitude;
  let lon = coord.longitude;

  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(showForecast);
};

const showTemprature = (response) => {
  let tempElement = document.querySelector('#temp');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let header = document.querySelector('h1');
  let descElement = document.querySelector('#description');
  let iconElement = document.querySelector('#icon');
  let dateElement = document.querySelector('#date-time');

  let city = response.data.city;
  let temp = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.condition.description;
  let icon = response.data.condition.icon_url;
  let time = response.data.time;

  header.innerHTML = city;
  descElement.innerHTML = capitalize(description);
  tempElement.innerHTML = temp;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  iconElement.setAttribute('src', icon);
  dateElement.innerHTML = formatDate(time);

  forecast(response.data.coordinates);
};

const search = (cityName) => {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemprature);
};

const handleSumbit = (e) => {
  e.preventDefault();
  let searchCity = capitalize(document.querySelector('#search-value').value);
  search(searchCity);
};

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSumbit);

search(city);
