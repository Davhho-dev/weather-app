import { updateWeatherData, updateLocation } from "./UI";

const input = document.getElementById("search");
const enterBtn = document.querySelector("button");

function animateSearchBar() {
  const style = window.getComputedStyle(input);
  const width = style.getPropertyValue("width");
  if (width === "0px") {
    input.setAttribute("style", "width: 75%; transition: width .5s ease;");
    setTimeout(() => {
      enterBtn.style.display = "block";
    }, 500);
  } else {
    input.removeAttribute("style", "width: 75%;");
    input.style.transition = "width .5s ease";
    setTimeout(() => {
      enterBtn.style.display = "none";
    }, 100);
  }
}

async function searchBar(userInput, units) {
    let city = userInput[0];
    let state = userInput[1];
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},%20${state}&limit=5&appid=c4404ba7cc6d37e8768e9682ed0c7259`,
      { mode: "cors" }
    );
    const locationData = await response.json();
    console.log(locationData);
    convertToCordinates(locationData, units, userInput);
}

async function convertToCordinates(data, units, userInput) {
    let lat = data[0].lat;
    let lon = data[0].lon;
    const cordinateResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c4404ba7cc6d37e8768e9682ed0c7259&units=${units}`,
      { mode: "cors" }
    );
    const cordinateData = await cordinateResponse.json();
    console.log(cordinateData);
    updateWeatherData(cordinateData, getCurrentHiLo(cordinateData), units);
    updateLocation(userInput);
    return cordinateData;
}

function getCurrentHiLo(weatherData) {
  const weatherArr = weatherData.list;
  const todaysDate = convertUnixToUTC(weatherData.list[0].dt).slice(0, 10);
  let low = Math.round(weatherData.list[0].main.temp_min);
  let high = Math.round(weatherData.list[0].main.temp_max);
  weatherArr.forEach((day) => {
    let ifTodaysDate = convertUnixToUTC(day.dt).slice(0, 10);
    let minTemp = Math.round(day.main.temp_min);
    let maxTemp = Math.round(day.main.temp_max);
    day.dt = convertUnixToUTC(day.dt);
    if (ifTodaysDate === todaysDate) {
      if(minTemp <= low) low = minTemp;
      if(maxTemp >= high) high = maxTemp;
    }
  });
  return [low, high];
}

function convertUnixToUTC(unixTime) {
  const convertedDate = new Date(unixTime * 1000).toLocaleDateString();
  const convertedTime = new Date(unixTime * 1000).toLocaleTimeString();
  let result = "";
  (convertedDate.length < 10) ? result = ("0" + convertedDate) : result = convertedDate;
  return result += `, ${convertedTime}`;
}

export { animateSearchBar, searchBar };
