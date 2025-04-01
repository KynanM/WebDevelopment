const setup = () => {

    const nu = new Date();
    let verjaardag = new Date(nu.getFullYear(), 2, 27);

    if (nu > verjaardag) {
        verjaardag.setFullYear(nu.getFullYear() + 1);
    }

    const dagenTotVerjaardag = Math.ceil((verjaardag - nu) / (1000 * 60 * 60 * 24));
    console.log(`Dagen tot je volgende verjaardag: ${dagenTotVerjaardag}`);
}
window.addEventListener("load", setup);