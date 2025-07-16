const sketchContainer = document.querySelector("#sketch-container")

for(let i = 0; i < 100; i++){
    let div = document.createElement('div')
    div.classList.add('sketch-block')
    div.style.width = `${720/10}px`
    div.style.height = `${720/10 }px`
    sketchContainer.appendChild(div)
}