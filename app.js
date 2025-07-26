const sketchContainer = document.querySelector("#sketch-container");
const menuContainer = document.querySelector(".menu-container");
const colorSelector = document.querySelector("#color-selector");
const sizeGridSelector = document.querySelector("#size-selector");
const displaySizeGridValue = document.querySelector("#size-value");
const buttons = document.querySelectorAll("button");
let modeValue = "color-mode";
let colorValue = "#1921ff";
let sizeGridValue = 16;
let mouseDown;
let rainbowModeActive = false;

makeGrid(sizeGridValue);

menuContainer.addEventListener("click", handleButtons);

sizeGridSelector.addEventListener("mousemove", setSizeGridValue);
sizeGridSelector.addEventListener("change", changeSizeGrid);
colorSelector.addEventListener("input", setColorValue);
sketchContainer.addEventListener("mousedown", () => (mouseDown = true));
sketchContainer.addEventListener("mouseup", () => (mouseDown = false));
sketchContainer.addEventListener("mouseleave", () => (mouseDown = false));

function generateRainbowColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function setColorValue(event) {
  colorValue = event.target.value;
}

function setModeValue(value) {
  modeValue = value;
}

function makeGrid(size) {
  const blockWidth = sketchContainer.clientWidth / size;
  const blockHeight = sketchContainer.clientHeight / size;

  for (let i = 0; i < size ** 2; i++) {
    const block = document.createElement("div");
    block.classList.add("sketch-block");
    block.style.width = `${blockWidth}px`;
    block.style.height = `${blockHeight}px`;
    sketchContainer.appendChild(block);
    block.addEventListener("mousemove", changeColor);
    block.addEventListener("click", changeColor);
  }
}

function reloadGrid() {
  sketchContainer.innerHTML = "";
}

function changeColor(event) {
  if (mouseDown || event.type === "click") {
    if (rainbowModeActive) {
      event.target.style.background = generateRainbowColor();
    } else {
      event.target.style.background = colorValue;
    }
  }
}

function changeSizeGrid(event) {
  sizeGridValue = event.currentTarget.value;
  reloadGrid();
  makeGrid(sizeGridValue);
}

function handleButtons(event) {
  function removeActiveClass() {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
  }

  setModeValue(event.target.getAttribute("id"));
  switch (modeValue) {
    case "clear":
      reloadGrid();
      makeGrid(sizeGridValue);
      break;
    case "erase-mode":
      removeActiveClass();
      rainbowModeActive = false;
      event.target.classList.add("active");
      colorValue = "#FFF";
      break;
    case "color-mode":
      removeActiveClass();
      rainbowModeActive = false;
      event.target.classList.add("active");
      colorValue = colorSelector.value;
      break;
    case "rainbow-mode":
      removeActiveClass();
      event.target.classList.add("active");
      rainbowModeActive = true;
      break;
  }
}

function setSizeGridValue(event) {
  displaySizeGridValue.innerHTML = `${event.target.value} x ${event.target.value}`;
}
