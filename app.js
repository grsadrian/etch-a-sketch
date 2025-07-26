const sketchContainer = document.querySelector("#sketch-container");
const menuContainer = document.querySelector(".menu-container");
const colorSelector = document.querySelector("#color-selector");
const sizeGridSelector = document.querySelector("#size-selector");
const displaySizeGridValue = document.querySelector("#size-value");
const btns = document.querySelectorAll("button");
let modeValue = "color-mode";
let colorValue = "#1921ff";
let sizeGridValue = 16;
let mouseDown;

makeGrid(sizeGridValue)

btns.forEach((btn) => {
  btn.addEventListener("click", setActiveClass);
});

sizeGridSelector.addEventListener("mousemove", setSizeGridValue);
sizeGridSelector.addEventListener("change", changeSizeGrid);
colorSelector.addEventListener("input", setColorValue);
sketchContainer.addEventListener("mousedown", () => mouseDown = true);
sketchContainer.addEventListener("mouseup", () => mouseDown = false)

function setColorValue(event) {
  colorValue = event.target.value;
}

function setModeValue(value) {
  modeValue = value;
}

function makeGrid(size) {
  const blockWidth = sketchContainer.clientWidth / size;
  const blockHeight = sketchContainer.clientHeight / size;
  reloadGrid();
  for (let i = 0; i < size ** 2; i++) {
    const block = document.createElement("div");
    block.classList.add("sketch-block");
    block.style.width = `${blockWidth}px`;
    block.style.height = `${blockHeight}px`;
    sketchContainer.appendChild(block);
    block.addEventListener("mousemove", changeColor);
  }
}

function reloadGrid() {
  sketchContainer.innerHTML = "";
}

function changeColor(event) {
  if (mouseDown) {
    console.log(event.currentTarget)
    event.target.style.background = colorValue;
  }
}

function changeSizeGrid(event) {
  sizeGridValue = event.currentTarget.value;
  makeGrid(sizeGridValue);
}

function setActiveClass(event) {
  if (event.currentTarget.getAttribute("id") != "clear") {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
  }
}

function setSizeGridValue(event) {
  displaySizeGridValue.innerHTML = `${event.target.value} x ${event.target.value}`;
}
