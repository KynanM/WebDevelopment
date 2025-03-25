const setup = () => {

        let StaatVanKip = document.getElementById("StaatVanKip").value;
        console.log("Staat van kip:", StaatVanKip);

        let geefEenLetter = document.getElementById("GeefEenLetter").value;

    function telLetter() {
        let tekst = "Hierboven een kip met ei";
        let teller = 0;
        let index = tekst.indexOf("GeefEenLetter");

        while (index !== -1) {
            teller++;
            index = tekst.indexOf("an", index + 1);
        }

        document.addEventListener("DOMContentLoaded", function () {
            const selectElement = document.getElementById("StaatVanKip");
            const imgDiv = document.getElementById("img");

            selectElement.addEventListener("change", function () {
                const selectedValue = selectElement.value;
                const img = document.createElement("img");

                if (selectedValue === "MetEi") {
                    img.src = "with-egg.png";
                } else {
                    img.src = "without-egg.png";
                }

                imgDiv(img);
            });
        });
    }

};
window.addEventListener("load", setup);