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


const citySearch = () => {
let searchedCity = searchBar.value;
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=${apiKey}`)
	.then((res)=>{
		return res.json();
	})
	.then((res)=>{
		console.log(res);
		let lat = res[0].lat;
		let lon = res[0].lon;
		console.log(lat, lon);
		fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
			.then((res)=>{
				return res.json();
			})
			.then((res)=>{
				console.log(res, "second api call");
				renderWeatherData (res);
			})
	})
}

const renderWeatherData = (city) => {
	let bigCard = document.getElementById("bigcard");
	console.log("First do a string", city);
	console.log(city.city.name);
	town.textContent = city.city.name;
	date.textContent = today;
	const iconUrl = `https://openweathermap.org/img/w/${city.list[0].weather[0].icon}.png`
	currentWeatherIcon.setAttribute("src", iconUrl);
	todayTemperature.textContent = "Temperature: " + city.list[0].main.temp;
	todayWind.textContent = "Wind: " + city.list[0].wind.speed;
	todayHumidity.textContent = "Humidity: " + city.list[0].main.humidity;
}


// (city.list[0].weather[0].icon);







document.querySelector(".button").addEventListener("click", citySearch);

// searchButton.addEventListener("click", citySearch); < - THIS IS SHORTHAND, SAME SHIT AS ABOVE