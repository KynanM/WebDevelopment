const setup = () => {

    function maakTrigrams(woord) {
        const trigrams = [];

        for (let i = 0; i < woord.length - 2; i++) {
            const trigram = woord.substring(i, i + 3);
            trigrams.push(trigram);
        }

        return trigrams;
    }

    const woord = "onoorbaar";

    const trigrams = maakTrigrams(woord);
    console.log(woord);
    console.log(trigrams);


}
window.addEventListener("load", setup);