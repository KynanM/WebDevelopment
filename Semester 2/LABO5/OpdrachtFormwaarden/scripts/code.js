function toonResultaat() {
    console.clear();
    console.log("Is roker:", document.getElementById("roker").checked);

    let moedertaal = document.querySelector("input[name='moedertaal']:checked");
    console.log("Moedertaal:", moedertaal ? moedertaal.value : "Niet opgegeven");

    let buurland = document.getElementById("buurland").value;
    console.log("Favoriete buurland:", buurland);

    let bestelling = Array.from(document.getElementById("bestelling").selectedOptions).map(opt => opt.value);
    console.log("Bestelling:", bestelling.join(", "));
}