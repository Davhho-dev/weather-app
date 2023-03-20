import { moveSlider } from "./slider";
import { animateSearchBar } from "./search";

const sliders = document.querySelector(".switch");
sliders.addEventListener("click", (e) => {
    moveSlider();
});

const form = document.querySelector("form");
form.addEventListener("click", (e) => {
    if(e.target.id === "search-icon" || e.target.id === "right-arrow") animateSearchBar(); 
});