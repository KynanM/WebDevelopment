const setup = () => {
    const knop = document.getElementById("kopieerKnop");

    if (knop) {
        knop.addEventListener("click", kopieerTekst);
    }
};

const kopieerTekst = () => {
    const invoerVeld = document.getElementById("tekstInvoer");
    const uitvoer = document.getElementById("resultaat");

    if (invoerVeld && uitvoer) {
        uitvoer.textContent = invoerVeld.value;
        console.log(invoerVeld.value);
    }
};

window.addEventListener("load", setup);
