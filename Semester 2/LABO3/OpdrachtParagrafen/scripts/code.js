const setup = () => {
    const belangrijkeElementen = document.querySelectorAll('.belangrijk');

    belangrijkeElementen.forEach(element => {
        element.className += ' opvallend';
    });
}
window.addEventListener("load", setup);