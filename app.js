const sketchContainer = document.querySelector("#sketch-container");
const menuContainer = document.querySelector(".menu-container");
const colorSelector = document.querySelector("#color-selector");
const sizeGridSelector = document.querySelector("#size-selector");
const displaySizeValue = document.querySelector("#size-value");
const btns = document.querySelectorAll("button");

btns.forEach((btn) => {
  btn.addEventListener("click", setActiveClass);
});

sizeGridSelector.addEventListener("mousemove", setSizeValue);
sizeGridSelector.addEventListener("change", changeSizeGrid);

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
  }
}

function reloadGrid() {
  sketchContainer.innerHTML = "";
}

function changeSizeGrid(event) {
  displaySizeValue.innerHTML = `${event.currentTarget.value} x ${event.currentTarget.value}`;
  makeGrid(event.currentTarget.value);
}

function setActiveClass(event) {
  if (event.currentTarget.getAttribute("id") != "clear") {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
  }
}

function setSizeValue(event) {
  displaySizeValue.innerHTML = `${event.currentTarget.value} x ${event.currentTarget.value}`;
}
