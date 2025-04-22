const storeSliderValues = () => {
    let red = document.getElementById("sldRed").value;
    let green = document.getElementById("sldGreen").value;
    let blue = document.getElementById("sldBlue").value;

    localStorage.setItem("sliderValues", JSON.stringify({
        red: red,
        green: green,
        blue: blue
    }));
};

const restoreSliderValues = () => {
    let sliderValues = localStorage.getItem("sliderValues");
    if (sliderValues) {
        sliderValues = JSON.parse(sliderValues);
        document.getElementById("sldRed").value = sliderValues.red;
        document.getElementById("sldGreen").value = sliderValues.green;
        document.getElementById("sldBlue").value = sliderValues.blue;
    }
};

const storeSwatches = () => {
    let swatches = [];
    let swatchElements = document.getElementById("swatchComponents").children;

    for (let i = 0; i < swatchElements.length; i++) {
        let swatch = swatchElements[i];
        swatches.push({
            red: swatch.getAttribute("data-red"),
            green: swatch.getAttribute("data-green"),
            blue: swatch.getAttribute("data-blue")
        });
    }

    localStorage.setItem("swatches", JSON.stringify(swatches));
};

const restoreSwatches = () => {
    let swatches = localStorage.getItem("swatches");
    if (swatches) {
        swatches = JSON.parse(swatches);
        for (let i = 0; i < swatches.length; i++) {
            addSwatchComponent(swatches[i].red, swatches[i].green, swatches[i].blue);
        }
    }
};