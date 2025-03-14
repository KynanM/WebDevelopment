const setup = () => {
    let gemeenten = [];
    let invoer;

    while ((invoer = prompt("Geef een gemeente in (of 'stop' om te stoppen):")) !== "stop") {
        if (invoer) {
            gemeenten.push(invoer);
        }
    }

    gemeenten.sort((a, b) => a.localeCompare(b));

    const select = document.getElementById("gemeenten");
    gemeenten.forEach(gemeente => {
        let optie = document.createElement("option");
        optie.textContent = gemeente;
        select.appendChild(optie);
    });
};
window.addEventListener("load", setup);

