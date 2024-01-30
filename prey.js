import { growSnake, overlapsSnake } from "./snake.js";

/* this functions updates the prey's position */
export const updatePrey = (gameOver) => {
    /* it first checks whether the prey is eaten, grows the snake, generate a new prey, and update the score if it is */
    if (overlapsSnake(prey)) {
        growSnake();
        prey = getRandomPreyPosition();
        updateScore();

        /* it then check if the game is over and generate a new one for the new game */
    } else if (gameOver) prey = getRandomPreyPosition();
};

export const drawPrey = (gameBoard) => {
    const bodyElement = document.createElement("div");
    bodyElement.classList.add("prey");
    bodyElement.style.gridRowStart = prey.y;
    bodyElement.style.gridColumnStart = prey.x;
    gameBoard.appendChild(bodyElement);
};

/* prevent the new generated prey overlaps the snake's body, a while loop is implemented */
const getRandomPreyPosition = () => {
    let newPreyPosition;

    while (newPreyPosition == null || overlapsSnake(newPreyPosition)) {
        newPreyPosition = {
            x: Math.ceil(Math.random() * 21),
            y: Math.ceil(Math.random() * 21),
        };
    }

    return newPreyPosition;
};

const updateScore = () => {
    const score = document.getElementById("score");
    score.textContent = Number(score.textContent) + 1;
};

let prey = getRandomPreyPosition();
