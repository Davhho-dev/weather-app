const input = document.getElementById("search");
const rightArrow = document.getElementById("right-arrow");

function searchBar() {
    const style = window.getComputedStyle(input);
    const width = style.getPropertyValue("width");
    if(width === "0px") {
        input.setAttribute("style", "width: 75%; transition: width .5s ease;");
        setTimeout(() => {
            rightArrow.style.display = "block";
        }, 500);
    }else {
        input.removeAttribute("style", "width: 75%;");
        input.style.transition = "width .5s ease";
        setTimeout(() => {
            rightArrow.style.display = "none";
        }, 100)
    }
}

export {searchBar};



