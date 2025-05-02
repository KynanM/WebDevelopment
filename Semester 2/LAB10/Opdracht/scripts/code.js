const setup = () => {
    let historyArray = JSON.parse(localStorage.getItem("searchHistory")) || [];

    const siteData = {
        '/g': {title: 'Google', base: 'https://www.google.com/search?q=', class: 'card-google'},
        '/y': {title: 'YouTube', base: 'https://www.youtube.com/results?search_query=', class: 'card-youtube'},
        '/x': {title: 'X', base: 'https://x.com/hashtag/', class: 'card-x'},
        '/i': {title: 'Instagram', base: 'https://www.instagram.com/explore/tags/', class: 'card-instagram'}
    };

    function handleSearch() {
        const input = document.getElementById("searchInput").value.trim();
        if (!input.startsWith("/")) {
            alert("Ongeldig commando");
            return;
        }

        const spaceIndex = input.indexOf(" ");
        const command = input.substring(0, spaceIndex);
        const query = input.substring(spaceIndex + 1).trim();
        if (!siteData[command] || !query) {
            alert("Ongeldige prefix of lege zoekopdracht");
            return;
        }

        const encodedQuery = encodeURIComponent(query).replace(/%20/g, "+");
        const url = siteData[command].base + encodedQuery;

        window.open(url, '_blank');

        const entry = {
            title: siteData[command].title,
            text: query,
            url: url
        };

        historyArray.push(entry);
        localStorage.setItem("searchHistory", JSON.stringify(historyArray));
        addCard(entry);
        document.getElementById("searchInput").value = "";
    }

    function addCard(entry) {
        const cardClass = Object.values(siteData).find(s => s.title === entry.title)?.class || 'bg-secondary';
        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";
        col.innerHTML = `
            <div class="card ${cardClass}">
              <div class="card-body">
                <h5 class="card-title">${entry.title}</h5>
                <p class="card-text">${entry.text}</p>
                <a href="${entry.url}" target="_blank" class="btn btn-light">Go!</a>
              </div>
            </div>`;
        document.getElementById("historyRow").appendChild(col);
    }

    function loadHistory() {
        const order = ['Google', 'YouTube', 'X', 'Instagram'];
        historyArray.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));
        historyArray.forEach(addCard);
    }

    const goButton = document.getElementById("go-button");
    goButton.addEventListener("click", handleSearch);

    loadHistory();
};

window.addEventListener("load", setup);
