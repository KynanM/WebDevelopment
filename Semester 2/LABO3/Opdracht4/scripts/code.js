window.addEventListener("load", () => {
    let knop = document.getElementById("herbereken");
    knop.addEventListener("click", () => {
        let aantallen = document.getElementsByClassName("aantal");
        let prijzen = document.getElementsByClassName("prijs");
        let btwTarief = document.getElementsByClassName("btw");
        let subtotaalCellen = document.getElementsByClassName("subtotaal");
        let totaal = 0;

        for (let i = 0; i < aantallen.length; i++) {
            let aantal = parseInt(aantallen[i].value);
            let prijs = parseFloat(prijzen[i].textContent);
            let btw = parseInt(btwTarief[i].textContent);
            let subtotaal = aantal * prijs * (1 + btw / 100);
            subtotaalCellen[i].textContent = subtotaal.toFixed(2) + " Eur";
            totaal += subtotaal;
        }

        document.getElementById("totaal").textContent = "Totaal: " + totaal.toFixed(2) + " Eur";
    });
});