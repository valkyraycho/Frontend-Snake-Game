import { drawPrey, updatePrey } from "./prey.js";
import {
    SNAKE_SPEED,
    updateSnake,
    drawSnake,
    snakeHitsBorder,
    snakeHitsItself,
    resetSnake,
} from "./snake.js";

/* wait for the page to complete loading then call initApp that runs the main function */
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        const gameBoard = document.getElementById("game_board");

        /* create the start button and show it on the game board */
        const startButton = document.createElement("button");
        startButton.textContent = "Press to Start";
        startButton.id = "startButton";
        startButton.addEventListener("click", (event) => {
            startButton.className = "hidden";
            /* gameBoard is passed to initApp for reuse */
            initApp(gameBoard);
        });
        gameBoard.appendChild(startButton);
    }
});

/* the function that keeps running */
const initApp = (gameBoard) => {
    /* initiate the render time for page rerender frequency */
    let lastRenderTime = 0;
    let gameOver = false;

    /* the main function that constantly updates the page */
    const main = (currentTime) => {
        if (gameOver) {
            showGameOverMessage();
            const restartButton = document.getElementById("restart_button");
            restartButton.addEventListener("click", restart);
            return;
        }

        /* this code below basically implements fps and it depends on the the speed of the snake 
           in this case I want the snake to move every 0.2 seconds, but it can be easily adjusted */
        window.requestAnimationFrame(main);
        const timeSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (timeSinceLastRender < 1 / SNAKE_SPEED) return;
        lastRenderTime = currentTime;

        update();
        draw();
    };

    /* the first screen update request should be after the definition of `main` */
    window.requestAnimationFrame(main);

    /* everytime an update occurs, we need to check whether the game is over first, if it is then no further updates will be executed
       otherwise, we update the snake's and the prey's position */
    const update = () => {
        const isGameOver = checkGameOver();
        if (isGameOver) return;
        updateSnake();
        updatePrey();
    };

    /* this function checks whether the game is over by checking if the snake hits the border or itself and return the result for further use */
    const checkGameOver = () => {
        gameOver = snakeHitsBorder() || snakeHitsItself();
        return gameOver;
    };

    /* before drawing the new components, we need to clear the gameboard then draw them */
    const draw = () => {
        gameBoard.innerHTML = "";
        drawPrey(gameBoard);
        drawSnake(gameBoard);
    };

    /* make the game over message visible and show the final score */
    const showGameOverMessage = () => {
        const gameOverOverlay = document.getElementById("game_over_overlay");
        gameOverOverlay.style.display = "flex";
        const score = document.getElementById("score");
        const finalScore = document.getElementById("final_score");
        finalScore.textContent = score.textContent;
    };

    /* after pressing the restart button, we re-initialize everything and hide the game over message to reuse for the next gameover */
    const restart = () => {
        updatePrey(gameOver);
        gameOver = false;
        resetSnake();
        resetScore();
        hideGameOverMessage();
        window.requestAnimationFrame(main);
    };

    const resetScore = () => {
        const score = document.getElementById("score");
        score.textContent = 0;
    };

    const hideGameOverMessage = () => {
        const gameOverOverlay = document.getElementById("game_over_overlay");
        gameOverOverlay.style.display = "none";
    };
};
