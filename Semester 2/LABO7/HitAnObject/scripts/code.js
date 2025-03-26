let global = {
    IMAGE_SIZE: 48,
    IMAGE_PATH_PREFIX: "images/",
    IMAGE_LIST: ["0.png", "1.png", "2.png", "3.png", "4.png"],
    MOVE_DELAY: 1000,
    score: 0,
    timeoutId: null
};

const setup = () => {
    let image = document.createElement('img');
    image.setAttribute("id", "target");
    image.setAttribute("alt", "Een object");
    image.classList.add('target');
    image.addEventListener("click", handleClick);

    let field = document.getElementById("playField");
    field.appendChild(image);

    updateSize();
    window.addEventListener("resize", updateSize);
    startGameLoop();
};

const updateSize = () => {
    let field = document.getElementById("playField");
    field.style.width = window.innerWidth + "px";
    field.style.height = window.innerHeight + "px";
};

const handleClick = (event) => {
    if (event.target.isBomb) {
        alert("Game Over! Je hebt op een bom geklikt!");
        clearInterval(global.timeoutId);
        return;
    }
    global.score++;
    updateScore();
    moveSprite();
    changeImage();
};

const startGameLoop = () => {
    global.timeoutId = setInterval(() => {
        moveSprite();
        changeImage();
    }, global.MOVE_DELAY);
};

const moveSprite = () => {
    let sprite = document.getElementById("target");
    let field = document.getElementById("playField");
    let maxLeft = field.clientWidth - sprite.offsetWidth;
    let maxTop = field.clientHeight - sprite.offsetHeight;

    sprite.style.left = Math.floor(Math.random() * maxLeft) + "px";
    sprite.style.top = Math.floor(Math.random() * maxTop) + "px";
};

const changeImage = () => {
    let sprite = document.getElementById("target");
    let randomIndex = Math.floor(Math.random() * global.IMAGE_LIST.length);
    let imageName = global.IMAGE_LIST[randomIndex];

    sprite.setAttribute("src", global.IMAGE_PATH_PREFIX + imageName);
    sprite.isBomb = imageName === "0.png";
};

const updateScore = () => {

    document.getElementById("score").textContent = "Score: " + global.score;
};

window.addEventListener("load", setup);
