const state = document.getElementById("state");
const city = document.getElementById("city");

function updateLocation(userInput) {
    city.textContent = userInput[0];
    city.style.textTransform = "capitalize";
    state.textContent = userInput[1];
    state.style.textTransform = "capitalize";
}

function updateWeatherData(weatherData, hiLoArr) {
    const weatherCondition = document.getElementById("weather-condition");
    weatherCondition.textContent = weatherData.list[0].weather[0].description;
    const temperature = document.getElementById("temperature");
    temperature.textContent = Math.round(weatherData.list[0].main.temp);
    const low = document.getElementById("low");
    low.textContent = hiLoArr[0];
    const high = document.getElementById("high");
    high.textContent = hiLoArr[1];
}


export {updateLocation, updateWeatherData};