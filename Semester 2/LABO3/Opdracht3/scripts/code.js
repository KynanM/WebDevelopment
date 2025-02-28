window.addEventListener("load", () => {
    let knoppen = document.querySelectorAll(".kleurknop");

    knoppen.forEach(knop => {
        knop.addEventListener("click", () => {
            knop.classList.toggle("blauw");
        });
    });
});