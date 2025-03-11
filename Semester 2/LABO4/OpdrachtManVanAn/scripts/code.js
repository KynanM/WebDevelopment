function telAn() {
    let tekst = "De man van An geeft geen hand aan ambetante verwanten";
    let teller = 0;
    let index = tekst.indexOf("an");

    while (index !== -1) {
        teller++;
        index = tekst.indexOf("an", index + 1);
    }

    console.log("'an' komt voor:", teller, "keer");
}