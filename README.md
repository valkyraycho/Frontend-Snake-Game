# Snake Game

This is a simple implementation of the classic Snake game using HTML, CSS, and Vanilla JavaScript. The game features a grid-based layout where the snake moves around to capture prey and grow in length.

## Implementation Details

### Grid Layout

The game board is implemented using CSS Grid, creating a 21x21 grid to represent the playing area. This grid layout is set up to visually organize the snake, prey, and other game elements.

```
#game_board {
    background-color: gainsboro;
    width: 100vmin;
    height: 100vmin;
    display: grid;
    grid-template-rows: repeat(21, 1fr);
    grid-template-columns: repeat(21, 1fr);
    position: relative;
}
```

### Game Logic
The game utilizes the `window.requestAnimationFrame()` function to create a smooth and efficient animation loop. The main game loop, main(), is responsible for updating and rendering the game elements.

```
const main = (currentTime) => {
    if (gameOver) {
        // Show game over message and restart button
        showGameOverMessage();
        const restartButton = document.getElementById("restart_button");
        restartButton.addEventListener("click", restart);
        return;
    }

    window.requestAnimationFrame(main);

    // Game update and draw functions
    const timeSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (timeSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;

    update();
    draw();
};
```

### Snake Movement and Growth
The snake's movement is controlled by arrow keys using an event listener. The direction is updated when an arrow key is pressed, and the snake's position is continually updated based on its current direction.
```
/* add event listener for each arrow keys and update the new direction the snake should head toward */
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        // Update newDirection based on arrow keys
    }
});

/* update the current direction and return the new one */
export const getDirection = () => {
    currentDirection = newDirection;
    return newDirection;
};
```

The snake grows when it captures prey. The `growSnake()` function adds a new segment to the snake's body.

### Prey Generation
Prey is randomly generated on the game board and repositioned if it overlaps with the snake. The `updatePrey()` function checks for collisions and updates the prey's position accordingly.
```
/* this functions updates the prey's position */
export const updatePrey = (gameOver) => {
    // Check if prey is eaten, grow snake, generate new prey, and update score
    // ...
    // Check if game over and generate new prey for the next game
    // ...
};
```
