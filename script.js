const api = {
  key: "46950e18da2806a3091f56acd0b288fc",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    if (searchBox.value == "") {
      alert("Please fill this out first");
    }

    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  if (weather.cod === "404") {
    alert("The city or country is not found");
  }
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".main-temp .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherEl = document.querySelector(".main-temp .weather");
  weatherEl.innerHTML = weather.weather[0].main;

  let highLow = document.querySelector(".main-temp .high-low");
  highLow.innerHTML = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(s) {
  let months = [
    "January",
    "February",
    "March",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()]; // Note: January = 0, February = 1;
  let year = s.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
