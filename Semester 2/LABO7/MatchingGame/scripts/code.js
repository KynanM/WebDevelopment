const global = {
    IMAGE_SUBFOLDER: './images/',
    AUDIO_SUBFOLDER: './sounds/',
    MAX_IMAGES: 6,
    CORRECT_TIMEOUT: 500,
    WRONG_TIMEOUT: 500,
    matchCount: 2,
    cardCount: 6,
    TURN_SOUND: new Audio('./sounds/flip.mp3'),
    CORRECT_SOUND: new Audio('./sounds/correct.mp3'),
    WRONG_SOUND: new Audio('./sounds/wrong.mp3'),
    selectedCards: [],
    processing: false,
    cardCountSlider: document.querySelector('#cardCountSlider'),
    cardCountDisplay: document.querySelector('#cardCountDisplay'),
    matchCountSlider: document.querySelector('#matchCountSlider'),
    matchCountDisplay: document.querySelector('#matchCountDisplay'),
    gameBoard: document.querySelector('#game-board'),
    winModal: null
};


const calculateGridDimensions = (totalCards) => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const totalSlots = totalCards * global.matchCount;
    let bestCols = Math.ceil(Math.sqrt(totalSlots));
    let bestRows = Math.ceil(totalSlots / bestCols);

    const findBestGridConfiguration = () => {
        for (let cols = bestCols; cols > 0; cols--) {
            const rows = Math.ceil(totalSlots / cols);
            if (cols * rows === totalSlots) {
                return { cols, rows };
            }
            if (Math.abs(cols - rows) < Math.abs(bestCols - bestRows)) {
                bestCols = cols;
                bestRows = rows;
            }
        }
        return { cols: bestCols, rows: bestRows };
    };

    return aspectRatio > 1
        ? { cols: findBestGridConfiguration().rows, rows: findBestGridConfiguration().cols }
        : findBestGridConfiguration();
};

const createWinModal = () => {
    if (global.winModal) {
        return;
    }
    global.winModal = document.createElement('div');
    global.winModal.id = 'win-modal';
    global.winModal.classList.add('win-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('win-modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Gefeliciteerd!';
    modalContent.appendChild(title);

    const message = document.createElement('p');
    message.textContent = "Je hebt het spel gewonnen!";
    modalContent.appendChild(message);

    const playAgainBtn = document.createElement('button');
    playAgainBtn.id = 'play-again-btn';
    playAgainBtn.textContent = 'Speel opnieuw';
    playAgainBtn.addEventListener('click', () => {
        global.winModal.classList.remove('show');
        setup();
    });
    modalContent.appendChild(playAgainBtn);

    global.winModal.appendChild(modalContent);
    document.body.appendChild(global.winModal);
};

const setup = () => {
    global.gameBoard.replaceChildren();
    global.gameBoard.style.gridTemplateColumns = '';

    global.cardCount = parseInt(global.cardCountSlider.value);
    global.matchCount = parseInt(global.matchCountSlider.value);
    global.cardCountDisplay.textContent = global.cardCount;
    global.matchCountDisplay.textContent = global.matchCount;

    const { cols } = calculateGridDimensions(global.cardCount);
    global.gameBoard.style.gridTemplateColumns = `repeat(${cols}, 100px)`;

    const availableImages = Array.from({ length: global.MAX_IMAGES }, (_, i) => `image${i + 1}.jpg`);
    let selectedImages = [];

    for (let i = 0; i < global.cardCount / 2; i++) {
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const selectedImage = availableImages.splice(randomIndex, 1)[0];
        selectedImages.push(selectedImage, selectedImage);
    }

    shuffleCards(selectedImages);

    selectedImages.forEach(image => {
        const Card = document.createElement('div');
        Card.classList.add('card');
        Card.dataset.image = global.IMAGE_SUBFOLDER + image;
        Card.addEventListener('click', turnCard);
        global.gameBoard.appendChild(Card);
        console.log('Afbeeldingspad:', Card.dataset.image);
    });
};

const turnCard = (event) => {
    const Card = event.target;
    if (global.processing ||
        Card.classList.contains('revealed') ||
        Card.classList.contains('matched')) return;

    global.TURN_SOUND.play().catch((e) => console.log('Geluid kan niet worden afgespeeld:', e));
    Card.classList.add('revealed');
    Card.style.backgroundImage = `url(${Card.dataset.image})`;

    global.selectedCards.push(Card);

    if (global.selectedCards.length === global.matchCount) {
        processCardGroup();
    }
};

const processCardGroup = () => {
    global.processing = true;

    const firstImage = global.selectedCards[0].dataset.image;
    const allMatch = global.selectedCards.every(card => card.dataset.image === firstImage);

    if (allMatch) {
        global.CORRECT_SOUND.play().catch((e) => console.log('Geluid kan niet worden afgespeeld:', e));
        global.selectedCards.forEach(card => {
            card.classList.add('matched');
        });
        setTimeout(() => {
            global.selectedCards = [];
            global.processing = false;
            checkFinish();
        }, global.CORRECT_TIMEOUT);
    } else {
        global.WRONG_SOUND.play().catch((e) => console.log('Geluid kan niet worden afgespeeld:', e));
        global.selectedCards.forEach(card => {
            card.classList.add('wrong-match');
        });
        setTimeout(() => {
            global.selectedCards.forEach(card => {
                card.classList.remove('revealed', 'wrong-match');
                card.style.backgroundImage = ``;
            });
            global.selectedCards = [];
            global.processing = false;
        }, global.WRONG_TIMEOUT);
    }
};

const checkFinish = () => {
    const matchedCards = document.querySelectorAll('.matched');

    if (matchedCards.length === global.cardCount) {
        createWinModal();
        setTimeout(() => {
            global.winModal.classList.add('show');
        }, global.CORRECT_TIMEOUT);
    }
};

const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

window.addEventListener("load", () => {
    setup();
});
global.cardCountSlider.addEventListener('input', setup);
global.matchCountSlider.addEventListener('input', setup);