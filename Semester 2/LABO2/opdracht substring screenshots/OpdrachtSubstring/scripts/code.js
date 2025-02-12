const setup = () => {
    document.getElementById("verwerkKnop").addEventListener("click", verwerkSubstring);
};
const verwerkSubstring = () => {
    const tekst = document.getElementById("tekstInvoer").value;
    const begin = parseInt(document.getElementById("startIndex").value, 10);
    const einde = parseInt(document.getElementById("eindIndex").value, 10);
    const uitvoerElement = document.getElementById("resultaat");

    if (!isNaN(begin) && !isNaN(einde)) {
        const resultaat = tekst.substring(begin, einde);
        uitvoerElement.textContent = resultaat;
        console.log(resultaat);
    } else {
        uitvoerElement.textContent = "(ongeldige invoer)";
        console.log("(ongeldige invoer)");
    }
};

window.addEventListener("load", setup);
