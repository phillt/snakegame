class Move {
    #snakes;
    #snake;
    #board;

    constructor(snake, snakes, board) {
        this.#snake = snake;
        this.#snakes = snakes;
        this.#board = board;
    }

    getMove() {
        const head = this.#getHead();

    }

    #getPossibleMovesFromHead() {
        const { x, y } = this.#snake.head;

        return {
            up: {: y + 1,
            down: y - 1,
            left: x - 1,
            right: x + 1,
        }
    }

    #getHead() {
        return this.#snake.head;
    }
}

export default Move;
