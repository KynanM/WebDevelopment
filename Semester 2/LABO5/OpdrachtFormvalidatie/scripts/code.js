const setup = () => {
    document.getElementById("form").addEventListener("submit", function(event) {
        let foutmelding = "";
        let voornaam = document.getElementById("voornaam").value;
        let achternaam = document.getElementById("achternaam").value;
        let geboortedatum = document.getElementById("geboortedatum").value;
        let email = document.getElementById("email").value;
        let wachtwoord = document.getElementById("wachtwoord").value;

        if (voornaam.trim() === "" || achternaam.trim() === "") {
            foutmelding += "Voornaam en achternaam mogen niet leeg zijn.\n";
        }
        if (!geboortedatum) {
            foutmelding += "Geboortedatum is verplicht.\n";
        }
        if (!email.includes("@")) {
            foutmelding += "E-mailadres moet een @ bevatten.\n";
        }
        if (wachtwoord.length < 6) {
            foutmelding += "Wachtwoord moet minstens 6 tekens lang zijn.\n";
        }

        if (foutmelding !== "") {
            event.preventDefault();
            document.getElementById("foutmelding").textContent = foutmelding;
        }
    });
};
window.addEventListener("load", setup);


