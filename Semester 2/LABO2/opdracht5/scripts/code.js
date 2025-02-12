document.addEventListener("DOMContentLoaded", () => {
    const knop = document.querySelector("#veranderKnop");

    if (knop) {
        knop.addEventListener("click", () => {
            const tekstElement = document.querySelector("#tekstWeergave");
            if (tekstElement) {
                tekstElement.textContent = "Welkom!";
            }
        });
    }
});
