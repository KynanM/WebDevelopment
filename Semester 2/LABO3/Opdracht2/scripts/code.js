window.addEventListener("load", () => {
    let sliders = document.querySelectorAll("input");
    let box = document.getElementById("colorBox");

    function updateColor() {
        let r = sliders[0].value;
        let g = sliders[1].value;
        let b = sliders[2].value;
        box.style.backgroundColor = `rgb(${r},${g},${b})`;
    }

    sliders.forEach(slider => slider.addEventListener("input", updateColor));
});