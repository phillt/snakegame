import Board from "./Board.js";
import Snake from "./Snake.js";

class SnakeRequest {
    #body;

    constructor(body) {
        this.#body = body;
    }

    get board() {
        return new Board(this.#body);
    }

    get mySnake() {
        const snake = new Snake();
        snake.body = this.#body.you.body;
        snake.head = this.#body.you.head;

        return snake;
    }

    get allSnakes() {
        return this.#body.board.snakes.map((current_snake) => {
            const snake = new Snake();
            snake.body = current_snake.body;
            snake.head = current_snake.head;

            return snake;
        })
    }

    get foodCollection() {
        return this.#body.data.board.food;
    }
}

export default SnakeRequest;
