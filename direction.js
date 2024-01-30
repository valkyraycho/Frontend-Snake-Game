/* initially, the snake is set to go right */
let currentDirection = { x: 1, y: 0 };
let newDirection = { x: 1, y: 0 };

/* add event listener for each arrow keys and update the new direction the snake should head toward */
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (currentDirection.y !== 0) break;
            newDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (currentDirection.y !== 0) break;
            newDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (currentDirection.x !== 0) break;
            newDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (currentDirection.x !== 0) break;
            newDirection = { x: 1, y: 0 };
            break;

        default:
            break;
    }
});

/* update the current direction and return the new one */
export const getDirection = () => {
    currentDirection = newDirection;
    return newDirection;
};

export const resetDirection = () => {
    currentDirection = { x: 1, y: 0 };
    newDirection = { x: 1, y: 0 };
};
