const searchBar = document.getElementById("cityName");
const searchButton = document.querySelector(".button");
const apiKey = "8d263a2aa699cd8bdfaba1edd5f94798";
const today = moment().format("M, D, YYYY");
const date = document.getElementById("date");
const town = document.getElementById("town");
const currentWeatherIcon = document.getElementById("current-weather-icon");
const todayTemperature = document.getElementById("today-temperature");
const todayWind = document.getElementById("today-wind");
const todayHumidity = document.getElementById("today-humidity");
const searchesContainer = document.getElementById("searches-container");

const forecast1  = moment().add(1,'days').format("M, D");
const forecast2 = moment().add(2, 'days').format("M, D");
const forecast3  = moment().add(3,'days').format("M, D");
const forecast4 = moment().add(4, 'days').format("M, D");
const forecast5  = moment().add(5,'days').format("M, D");
const forecastArr = [forecast1, forecast2, forecast3, forecast4, forecast5];

let cities = [];


const citySearch = () => {
let searchedCity = searchBar.value;
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=${apiKey}`)
	.then((res)=>{
		return res.json();
	})
	.then((res)=>{
		console.log(res);
		let lat = res[0].lat;
		let lon = res[0].lon;
		console.log(lat, lon);
		fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
			.then((res)=>{
				return res.json();
			})
			.then((res)=>{
				console.log(res, "second api call");
				document.getElementById("forecast-container").innerHTML = "";
				renderWeatherData (res);
				renderWeeklyForecast(res);
			})
	})
}

const renderWeatherData = (city) => {
	let bigCard = document.getElementById("bigcard");
	town.textContent = city.city.name;
	date.textContent = today;
	let iconUrl = `https://openweathermap.org/img/w/${city.list[0].weather[0].icon}.png`
	currentWeatherIcon.setAttribute("src", iconUrl);
	todayTemperature.textContent = "Temperature: " + city.list[0].main.temp;
	todayWind.textContent = "Wind: " + city.list[0].wind.speed;
	todayHumidity.textContent = "Humidity: " + city.list[0].main.humidity;
}


const renderWeeklyForecast = (city) => {
	let x = 6;
	for (i = 0; i < 5; i++) {
		let forecastCard = document.createElement("div");
		let forecastDate = document.createElement("h3");
		forecastCard.setAttribute("class", "card p-4");
		forecastDate.textContent = forecastArr[i];
		forecastCard.append(forecastDate);
		document.getElementById("forecast-container").append(forecastCard);
		let tempEl = document.createElement("p");
		tempEl.innerHTML = "Temperature: " + city.list[x].main.temp;
		let windEl = document.createElement("p");
		windEl.innerHTML = "Wind: " + city.list[x].wind.speed;
		let humidityEl = document.createElement("p");
		humidityEl.innerHTML = "Humidity: " + city.list[x].main.humidity;
		forecastCard.append(tempEl, windEl, humidityEl);
		x = x+8;
	}
}

function addToHistory() {
	let searchedCity = searchBar.value;
	cities.push(searchedCity);
	console.log(cities, "string of search histry");
	localStorage.setItem("stored", JSON.stringify(cities));
	renderToHistory();
}

const renderToHistory = () => {
	searchesContainer.innerHTML = "";
	let rendered = localStorage.getItem("stored")
		if (rendered) {
			cities = JSON.parse(rendered);
			console.log(cities, "second function of searched values");
		}
		for (i = cities.length - 1; i >= 0; i--) {
			let button = document.createElement("button");
			button.textContent = cities[i];
			button.setAttribute("style", "display: block")
			searchesContainer.append(button);
		}
}




searchButton.addEventListener("click", (event) => {
// event.preventDefault();
citySearch();
addToHistory();

})