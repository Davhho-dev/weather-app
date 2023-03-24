const state = document.getElementById("state");
const city = document.getElementById("city");

function updateLocation(userInput) {
  city.textContent = userInput[0];
  city.style.textTransform = "capitalize";
  state.textContent = userInput[1];
  state.style.textTransform = "capitalize";
}

function updateWeatherData(weatherData, hiLoArr, units) {
  const mainLeft = document.getElementById("main-left");
  const currentDay = weatherData.list[0];
  const weatherCondition = document.getElementById("weather-condition");
  weatherCondition.textContent = currentDay.weather[0].description;
  const temperature = document.getElementById("temperature");
  temperature.textContent = Math.round(currentDay.main.temp);
  const low = document.getElementById("low");
  low.textContent = hiLoArr[0];
  const high = document.getElementById("high");
  high.textContent = hiLoArr[1];
  mainLeft.removeChild(mainLeft.lastChild);
  updateCurrentDayCard(weatherData.list, units);
  updateNextDayCards(weatherData.list, units);
}

function updateCurrentDayCard(weatherArr, units) {
  const mainLeft = document.getElementById("main-left");
  const todaysCard = document.createElement("div");
  todaysCard.classList.add("todays-card");
  const hourlyContainer = document.createElement("div");
  hourlyContainer.classList.add("hourly-container");
  const todaysData = weatherArr.slice(0, currentDateCounter(weatherArr));
  todaysData.forEach(day => {
    hourlyContainer.appendChild(createHourlyInfo(day, units));
  })
  todaysCard.appendChild(hourlyContainer);
  const scrollBox = document.createElement("div");
  scrollBox.classList.add("scroll-box");
  scrollBox.appendChild(todaysCard);
  mainLeft.appendChild(scrollBox);
}

function createHourlyInfo(hourlyData, units) {
  const hourlyInfo = document.createElement("div");
  hourlyInfo.classList.add("hourly-info");
  const hour = document.createElement("p");
  hour.classList.add("hour");
  hour.textContent = simplifyTime(hourlyData.dt.slice(11));
  const weatherIcon = createWeatherIcon(hourlyData.weather[0].icon);
  const tempContainer = document.createElement("div");
  tempContainer.classList.add("temp-container");
  const hourlyTemp = document.createElement("p");
  hourlyTemp.classList.add("hourly-temp");
  hourlyTemp.textContent = Math.round(hourlyData.main.temp);
  const degrees = document.createElement("p");
  degrees.classList.add("hourly-degrees");
  (units === "metric") ? degrees.textContent = "°C" : degrees.textContent = "°F";
  tempContainer.append(hourlyTemp, degrees);
  hourlyInfo.append(hour, weatherIcon, tempContainer);
  return hourlyInfo;
}

function updateNextDayCards(weatherArr, units) {
  const nextDaysArr = weatherArr.slice(currentDateCounter(weatherArr));
  createCards(nextDaysArr, units);
}

function createCards(weatherArr, units) {
  let cardStartDay = 1;
  let cardEndDay = cardCount(weatherArr);
  let startIndex = 0;
  let endIndex = currentDateCounter(weatherArr);
  let endIndexCount = endIndex;
  const mainRight = document.getElementById("main-right");
  const cardWrapper = document.getElementById("card-wrapper");
  cardWrapper.textContent = "";
  while(cardStartDay <= cardEndDay) {
    let sameDayArr = weatherArr.slice(startIndex, endIndexCount);
    const cards = document.createElement("div");
    cards.classList.add("cards", `day${cardStartDay}`);
    const calendarDay = document.createElement("p");
    calendarDay.classList.add("card-day");
    calendarDay.textContent = new Intl.DateTimeFormat("en-us", {weekday: "short"}).format(new Date(sameDayArr[0].dt.slice(0, 10)));
    const hourlyContainer = document.createElement("div");
    hourlyContainer.classList.add("hourly-container");
    sameDayArr.forEach(day => {
      hourlyContainer.appendChild(createHourlyInfo(day, units));
    });
    cards.append(calendarDay, hourlyContainer);
    cardWrapper.appendChild(cards);
    cardStartDay++;
    startIndex += endIndex;
    if(startIndex !== weatherArr.length) endIndex = currentDateCounter(weatherArr.slice(startIndex));
    endIndexCount += endIndex;
  }
  mainRight.appendChild(cardWrapper);  
}

//Count how many days until next day data
function currentDateCounter(weatherArr) {
  let counter = 0;
  const todaysDate = weatherArr[0].dt.slice(0, 10);
  weatherArr.forEach((date) => {
    if (todaysDate === date.dt.slice(0, 10)) counter++;
  });
  return counter;
}

//Count how many card containers to make based on different date.
function cardCount(weatherArr) {
  let dayCount = 1;
  let date = weatherArr[0].dt.slice(0, 10);
  weatherArr.forEach(day => {
    if(day.dt.slice(0, 10) !== date) {
      dayCount++;
      date = day.dt.slice(0, 10);
    }
  })
  return dayCount;
}

function simplifyTime(str) {
  let result = str.split(/:| /).join("");
  const period = result.slice(result.length - 2);
  (result.length > 7) ? result = result.slice(0, 2) : result = result.slice(0, 1);
  return result + period;
}

function createWeatherIcon(description) {
  const weatherIcon = document.createElement("img");
  weatherIcon.classList.add("weather-icon");
  weatherIcon.src = `https://openweathermap.org/img/wn/${description}@2x.png`;
  return weatherIcon;
}

export { updateLocation, updateWeatherData };
