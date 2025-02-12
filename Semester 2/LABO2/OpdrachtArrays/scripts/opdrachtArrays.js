const familieleden = ['Koen','Herry','Tom','Jeroen','Jef']

console.log(familieleden.length)

console.log(familieleden[0],familieleden[2],familieleden[4])

const VoegNaamToe = (familieleden) => {
    let nieuweNaam = prompt("Voer een extra naam in:");
    if (nieuweNaam) {
        familieleden.push(nieuweNaam);
    }
};

VoegNaamToe(familieleden);

console.log("Bijgewerkte namenlijst:", familieleden);

console.log(familieleden.join(", "));
