class EatFoodMove {
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
        const possibleMoves = this.#getPossibleMovesFromHead();

        const validMoves = [];

        Object.keys(possibleMoves).forEach((move) => {
                const coordinates = possibleMoves[move];
                if (this.#isSpaceOpen(coordinates)) {
                    validMoves.push(move);
                }
            }
        );

        const direction = this.#bringMeCloserToFood(validMoves, this.#getClosestFood());
        console.log(`Going ${direction}`);
        return direction;
    }

    #bringMeCloserToFood(validMoves, {x, y}) {
        if (x > this.#snake.head.x && validMoves.includes("right")) {
            return "right";
        }

        if (x < this.#snake.head.x && validMoves.includes("left")) {
            return "left";
        }

        if (y > this.#snake.head.y && validMoves.includes("up")) {
            return "up";
        }

        if (y < this.#snake.head.y && validMoves.includes("down")) {
            return "down";
        }

        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    #getClosestFood() {
        let closest = {};
        let closest_distance = 100000.0;
        for (const food of this.#board.food) {
            const current_distance = this.#getDistance(food);
            console.log(`Food at (${food.x}, ${food.y}) is ${current_distance} away`);
            if (current_distance < closest_distance) {
                closest = food;
                closest_distance = current_distance;
            }
        }

        return closest;
    }

    #getDistance({x, y}) {
        const difference_x = this.#snake.head.x - x;
        const difference_y = this.#snake.head.y - y;

        return Math.sqrt((difference_x * difference_x) + (difference_y * difference_y));
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

export default EatFoodMove;
