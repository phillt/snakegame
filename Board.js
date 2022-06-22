class Board {
    #board;

    constructor(board) {
        const {snakes, you, ...everything_else } = board;

        this.#board = everything_else;
    }

    get height() {
        this.#board.height;
    }

    get width() {
        this.#board.width;
    }

    get hazards() {
        this.#board.hazards;
    }

    get food() {
        this.#board.food
    }
}

export default Board;
