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
sketchContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();
  mouseDown = true;
});
document.addEventListener("mouseup", () => (mouseDown = false));

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
    block.addEventListener("mouseover", changeColor);
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
  const targetId = event.target.getAttribute("id");

  function removeActiveClass() {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
  }

  if (
    targetId === "erase-mode" ||
    targetId === "color-mode" ||
    targetId === "rainbow-mode"
  ) {
    removeActiveClass();
    event.target.classList.add("active");
  }

  setModeValue(targetId);
  switch (modeValue) {
    case "clear":
      reloadGrid();
      makeGrid(sizeGridValue);
      break;
    case "erase-mode":
      rainbowModeActive = false;
      colorValue = "#FFF";
      break;
    case "color-mode":
      rainbowModeActive = false;
      colorValue = colorSelector.value;
      break;
    case "rainbow-mode":
      rainbowModeActive = true;
      break;
  }
}

function setSizeGridValue(event) {
  displaySizeGridValue.innerHTML = `${event.target.value} x ${event.target.value}`;
}
