const searchBar = document.getElementById("cityName");
const searchButton = document.querySelector(".button");
const apiKey = "8d263a2aa699cd8bdfaba1edd5f94798";
const today = moment().format("M, D, YYYY");
const date = document.getElementById("date");
const town = document.getElementById("town");


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
		fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
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
}











document.querySelector(".button").addEventListener("click", citySearch);

// searchButton.addEventListener("click", citySearch); < - THIS IS SHORTHAND, SAME SHIT AS ABOVE