class Move {
    #snakes;
    #snake;
    #board;

    /**
     *
     * @param snake
     * @param snakes
     * @param board
     */
    constructor(snake, snakes, board) {
        this.#snake = snake;
        this.#snakes = snakes;
        this.#board = board;
    }

    getMove() {
        const head = this.#getHead();
        const possibleMoves = this.#getPossibleMovesFromHead();

        const validMoves = [];

        Object.keys(possibleMoves).forEach((move) => {
                const coordinates = possibleMoves[move];
                if (this.#isSpaceOpen(coordinates)) {
                    validMoves.push(move);
                }
            }
        );

        return validMoves[0];
    }

    #isSpaceOpen({x, y}) {
        if (!this.#isInBounds({x, y})) {
            return false;
        }

        if (this.#coordinateContainsSnake({x, y})) {
            return false;
        }

        // Check for hazards


        return true;
    }

    #coordinateContainsSnake({x, y}) {
        const snakes = this.#snakes

        for (const snake of snakes) {
            const found = snake.body.some(snake_bod => {
                return (snake_bod.x === x && snake_bod.y === y);
            })

            if (found) {
                return true;
            }
        }

        return false;
    }


    #isInBounds({x, y}) {
        const {height, width} = this.#board;
        if (y >= height || x >= width) {
            return false;
        }

        if (y < 0 || x < 0) {
            return false
        }

        return true;
    }

    #getPossibleMovesFromHead() {
        const {x, y} = this.#snake.head;

        return {
            up: {y: y + 1, x},
            down: {y: y - 1, x},
            left: {y, x: x - 1},
            right: {y, x: x + 1,}
        }
    }

    #getHead() {
        return this.#snake.head;
    }
}

export default Move;
