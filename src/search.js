import { updateWeatherData } from "./UI";

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
  console.log(userInput);
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city},%20${state}&limit=1&appid=c4404ba7cc6d37e8768e9682ed0c7259`,
    { mode: "cors" }
  );
  const locationData = await response.json();
  convertToCordinates(locationData, units);
}

async function convertToCordinates(data, units) {
  let lat = data[0].lat;
  let lon = data[0].lon;
  const cordinateResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c4404ba7cc6d37e8768e9682ed0c7259&units=${units}`,
    { mode: "cors" }
  );
  const cordinateData = await cordinateResponse.json();
  console.log(cordinateData);
  updateWeatherData(cordinateData, getCurrentHiLo(cordinateData));
  return cordinateData;
}

function getCurrentHiLo(weatherData) {
  const weatherArr = weatherData.list;
  const todaysDate = weatherData.list[0].dt_txt.slice(0, 10);
  let low = Math.round(weatherData.list[0].main.temp_min);
  let high = Math.round(weatherData.list[0].main.temp_max);
  weatherArr.forEach((day) => {
    let date = day.dt_txt.slice(0, 10);
    let minTemp = Math.round(day.main.temp_min);
    let maxTemp = Math.round(day.main.temp_max);
    if (date === todaysDate) {
      if(minTemp <= low) low = minTemp;
      if(maxTemp >= high) high = maxTemp;
    }
  });
  console.log(low);
  console.log(high);
  return [low, high];
}

export { animateSearchBar, searchBar };
