import { getDirection, resetDirection } from "./direction.js";

/* update how many times per second, which is how fast the snake is moving */
export const SNAKE_SPEED = 5;

/* initialize the snake to be one block at the center of the game board */
export const snakeBody = [{ x: 11, y: 11 }];

/* move the snake by removing the last element and add the new position it is heading to the front */
export const updateSnake = () => {
    const direction = getDirection();
    snakeBody.unshift({
        x: snakeBody[0].x + direction.x,
        y: snakeBody[0].y + direction.y,
    });
    snakeBody.pop();
};

/* redraw the whole snake and place the div elements to the game board */
export const drawSnake = (gameBoard) => {
    snakeBody.forEach((snakeBodyPos) => {
        const snakeBodyElement = document.createElement("div");
        snakeBodyElement.classList.add("snake");
        snakeBodyElement.style.gridRowStart = snakeBodyPos.y;
        snakeBodyElement.style.gridColumnStart = snakeBodyPos.x;
        gameBoard.appendChild(snakeBodyElement);
    });
};

/* this function checks if `elementPos`, which will be either the prey or the snake's head, overlaps the snake
   if the prey overlaps the snake's head, it means the snake captures the prey; 
   if the prey overlaps the rest of the snake's body, the prey is generated on top of it;
   if the snake's head overlaps the body, it hits itself */
export const overlapsSnake = (elementPos) => {
    return snakeBody.some((snakeBodyPos) => {
        /* this handles the conflict since the snake's head always overlaps it's head */
        if (elementPos === snakeBodyPos) return false;

        /* this checks if either the prey or the snake's head overlaps the snake's body */
        return (
            snakeBodyPos.x === elementPos.x && snakeBodyPos.y === elementPos.y
        );
    });
};

/* after the the snake captures the prey, simply duplicate the tail */
export const growSnake = () => {
    snakeBody.push(snakeBody.at(-1));
};

/* checks whether the snake goes off the border */
export const snakeHitsBorder = () => {
    const snakeHead = snakeBody[0];
    return (
        snakeHead.x < 1 ||
        snakeHead.x > 20 ||
        snakeHead.y < 1 ||
        snakeHead.y > 20
    );
};

export const snakeHitsItself = () => {
    return overlapsSnake(snakeBody[0]);
};

/* since `snakeBody` is an array, we can clear it by setting the length to 0 and initialize */
export const resetSnake = () => {
    snakeBody.length = 0;
    snakeBody.push({ x: 11, y: 11 });
    resetDirection();
};
