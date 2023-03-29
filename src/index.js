import { moveSlider } from "./slider";
import { animateSearchBar, searchBar } from "./search";
import { updateLocation } from "./UI";

let units = "imperial";
let inputArr = [];
const onLoadInput = ["Brooklyn", "New York"];

window.onload = (e) => {
  searchBar(onLoadInput, units);
}

const sliders = document.querySelector(".switch");
sliders.addEventListener("click", (e) => {
  units = moveSlider();
  if(inputArr.length > 0) searchBar(inputArr, units);
  else searchBar(onLoadInput, units)
});

const form = document.querySelector("form");
form.addEventListener("click", (e) => {
  if (e.target.id === "search-icon") animateSearchBar();
  else if (e.target.id === "right-arrow") {
    e.preventDefault();
    animateSearchBar();
    const userInput = document.getElementById("search").value;
    const findComma = userInput.indexOf(",");
    if(userInput.charAt(findComma + 1) === " ") inputArr = userInput.split(", ");
    else inputArr = userInput.split(",");
    if(inputArr[1] === undefined) alert("No state or country entered");
    searchBar(inputArr, units);
    form.reset();
  }
});
