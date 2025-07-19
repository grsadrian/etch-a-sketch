const sketchContainer = document.querySelector("#sketch-container");
const btns = document.querySelectorAll("button");

function setActiveClass(event) {
  if (event.currentTarget.getAttribute("id") != "clear") {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
  }
}

btns.forEach((btn) => {
  btn.addEventListener("click", setActiveClass);
});

for (let i = 0; i < 256; i++) {
  let div = document.createElement("div");
  div.classList.add("sketch-block");
  div.style.width = `${sketchContainer.clientWidth / 16}px`;
  div.style.height = `${sketchContainer.clientHeight / 16}px`;
  sketchContainer.appendChild(div);
}
