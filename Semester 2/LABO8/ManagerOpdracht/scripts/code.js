let personen = [];
let huidigePersoonIndex = -1;

const bewaarBewerktePersoon = () => {
    valideer();

    const errorElements = document.querySelectorAll('.errorMessage');
    if (Array.from(errorElements).some(el => el.innerHTML !== "")) return;

    const persoon = {
        voornaam: document.getElementById("txtVoornaam").value.trim(),
        familienaam: document.getElementById("txtFamilienaam").value.trim(),
        geboorteDatum: document.getElementById("txtGeboorteDatum").value.trim(),
        email: document.getElementById("txtEmail").value.trim(),
        aantalKinderen: parseInt(document.getElementById("txtAantalKinderen").value.trim())
    };

    if (huidigePersoonIndex === -1) {
        personen.push(persoon);
        huidigePersoonIndex = personen.length - 1;
    } else {
        personen[huidigePersoonIndex] = persoon;
    }

    updatePersonenLijst();
    document.getElementById("lstPersonen").selectedIndex = huidigePersoonIndex;
};

const bewerkNieuwePersoon = () => {
    document.querySelector("form").reset();
    clearAllErrors();
    document.getElementById("lstPersonen").selectedIndex = -1;
    huidigePersoonIndex = -1;
};

const verwijderGeselecteerdePersoon = () => {
    if (huidigePersoonIndex === -1) return;

    personen.splice(huidigePersoonIndex, 1);
    bewerkNieuwePersoon();
    updatePersonenLijst();
};

const sorteerPersonen = (sorteerVolgorde) => {
    personen.sort((a, b) => {
        const volledigeNaamA = `${a.voornaam} ${a.familienaam}`.toLowerCase();
        const volledigeNaamB = `${b.voornaam} ${b.familienaam}`.toLowerCase();
        return sorteerVolgorde === 'oplopend'
            ? volledigeNaamA.localeCompare(volledigeNaamB)
            : volledigeNaamB.localeCompare(volledigeNaamA);
    });

    updatePersonenLijst();
    if (huidigePersoonIndex !== -1) {
        const newIndex = personen.findIndex(p =>
            p.voornaam === document.getElementById("txtVoornaam").value.trim() &&
            p.familienaam === document.getElementById("txtFamilienaam").value.trim()
        );
        if (newIndex !== -1) {
            document.getElementById("lstPersonen").selectedIndex = newIndex;
            huidigePersoonIndex = newIndex;
        }
    }
};

const updatePersonenLijst = () => {
    const lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.innerHTML = "";

    personen.forEach((persoon, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${persoon.voornaam} ${persoon.familienaam}`;
        lstPersonen.appendChild(option);
    });
};

const laadPersoonInFormulier = (index) => {
    if (index >= 0 && index < personen.length) {
        const persoon = personen[index];
        document.getElementById("txtVoornaam").value = persoon.voornaam;
        document.getElementById("txtFamilienaam").value = persoon.familienaam;
        document.getElementById("txtGeboorteDatum").value = persoon.geboorteDatum;
        document.getElementById("txtEmail").value = persoon.email;
        document.getElementById("txtAantalKinderen").value = persoon.aantalKinderen;
        clearAllErrors();
    }
};

const persoonGeselecteerd = (event) => {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex !== -1) {
        huidigePersoonIndex = parseInt(event.target.options[selectedIndex].value);
        laadPersoonInFormulier(huidigePersoonIndex);
    }
};

const setup = () => {
    document.getElementById("btnBewaar").addEventListener("click", bewaarBewerktePersoon);
    document.getElementById("btnNieuw").addEventListener("click", bewerkNieuwePersoon);
    document.getElementById("lstPersonen").addEventListener("change", persoonGeselecteerd);

    const btnVerwijder = document.createElement("button");
    btnVerwijder.id = "btnVerwijder";
    btnVerwijder.textContent = "Verwijder";
    btnVerwijder.addEventListener("click", verwijderGeselecteerdePersoon);
    document.querySelector("div").appendChild(btnVerwijder);

    const btnSorteerOplopend = document.createElement("button");
    btnSorteerOplopend.textContent = "Sorteer A-Z";
    btnSorteerOplopend.addEventListener("click", () => sorteerPersonen('oplopend'));
    document.querySelector("div").appendChild(btnSorteerOplopend);

    const btnSorteerAflopend = document.createElement("button");
    btnSorteerAflopend.textContent = "Sorteer Z-A";
    btnSorteerAflopend.addEventListener("click", () => sorteerPersonen('aflopend'));
    document.querySelector("div").appendChild(btnSorteerAflopend);
};

window.addEventListener("load", setup);