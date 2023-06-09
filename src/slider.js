const slider = document.querySelector(".slider");

function moveSlider() {
    const radius = getComputedStyle(document.body).getPropertyValue("--switch-rd");
    const switchSlider = document.querySelector(".switch");
    const degrees = document.getElementById("degrees");
    const highDegree = document.getElementById("high-degrees");
    const lowDegree = document.getElementById("low-degrees");
    if(checkDirection() === "0px") {
        slider.setAttribute("style", "left: 50%; transition: all .5s ease;");
        switchSlider.setAttribute("style", "background: linear-gradient(225deg, #232e40, #1e2736); box-shadow:  -20px 20px 18px #1d2635, 20px -20px 18px #253043; transition: all .5s ease;");
        degrees.textContent = "°C";
        highDegree.textContent = "°C";
        lowDegree.textContent = "°C";
        return "metric";
    }else {
        slider.setAttribute("style", "left: 0; transition: all .5s ease;");
        switchSlider.removeAttribute("style", "background: linear-gradient(225deg, #232e40, #1e2736); box-shadow:  -20px 20px 18px #1d2635, 20px -20px 18px #253043;");
        switchSlider.style.transition = "all .5s ease";
        degrees.textContent = "°F";
        highDegree.textContent = "°F";
        lowDegree.textContent = "°F";
        return "imperial";
    }
}

function checkDirection() {
    const style = window.getComputedStyle(slider);
    const left = style.getPropertyValue("left");
    return left;
}

export {moveSlider};