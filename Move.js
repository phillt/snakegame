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
        const possibleMoves = this.#getPossibleMovesFromHead();

        const validMoves = [];

        Object.keys(possibleMoves).forEach((move) => {
                const coordinates = possibleMoves[move];
                if (this.#isSpaceOpen(coordinates)) {
                    validMoves.push({
                        direction: move,
                        coordinates
                    });
                }
            }
        );


        const movesWithLengths = validMoves.map((move) => {
            move.weight = this.#lengthUntilObstacle(move.coordinates, move.direction);
            // move.weight += this.#doesPathContainFood(move.coordinates, move.direction) ? 10 : 0;
            // if(this.#doesPathContainSelfSnake(move.coordinates, move.direction)) {
            //     console.log('path contains snake')
            //     move.weight -= 10;
            // }
            // move.weight += this.#doesPathContainSelfSnake(move.coordinates, move.direction) ? -10: 0;


            return move;
        }).sort((moveA, moveB) => moveB.weight - moveA.weight);

        const [long_one, long_two, ...other] = movesWithLengths;

        // return this.#getClosestFood([long_one, long_two]);

        // if lengths are the same choose a random one

        const max_weight = movesWithLengths[0].weight;

        const grouped = this.#utilGroupBy(movesWithLengths, 'weight')

        // console.log('grouped', grouped);

        return grouped[max_weight][Math.floor(Math.random() * grouped[max_weight].length)].direction;

        // return movesWithLengths[0].direction;

        // random
        // return validMoves[Math.floor(Math.random() * validMoves.length)].direction;
    }

    #doesPathContainSelfSnake({x, y}, direction) {
        let stop_count = false;

        let current = {x, y};
        while (stop_count === false) {
            if (direction === "up") {
                current.y += 1;
                if (this.#doesSpaceContainSelf({x: current.x, y: current.y})) {
                    return true;
                }
            }

            if (direction === "down") {
                current.y -= 1;
                if (this.#doesSpaceContainSelf({x: current.x, y: current.y})) {
                    return true;
                }
            }

            if (direction === "left") {
                current.x -= 1

                if (this.#doesSpaceContainSelf({x: current.x, y: current.y})) {
                    return true;
                }
            }

            if (direction === "right") {
                current.x += 1

                if (this.#doesSpaceContainSelf({x: current.x, y: current.y})) {
                    return true;
                }
            }
        }

        return false;
    }

    // Hurry up Joseph!
    #doesSpaceContainSelf({x, y}) {
        return this.#snake.body.some(snake_bod => {
            return (snake_bod.x === x && snake_bod.y === y);
        });
    }

    #getClosestFood(moves) {
        const movesWithFood = {};

        moves.forEach(({coordinates, move}) => {
            movesWithFood[move] = {};
            movesWithFood[move].foodScore = 11;
            for (let coordinate of coordinates) {
                this.#board.food.some(({x, y}) => {
                    if (x === coordinate.x && y === coordinate.y) {
                        movesWithFood[move].foodScore -= movesWithFood[move].foodScore;
                        return true;
                    }
                    return false;
                })
            }
        });

        let direction = "";
        let score = 11;

        Object.keys(movesWithFood).forEach(move => {
            if (move.foodScore < score) {
                score = move.foodScore;
                direction = move.direction;
            }
        })

        return direction;
    }


    #lengthUntilObstacle({x, y}, direction) {
        let stop_count = false;
        let count = 0;

        let current = {x, y};
        while (stop_count === false) {
            if (direction === "up") {
                current.y += 1;
                if (this.#isSpaceOpen({x: current.x, y: current.y})) {
                    count++;
                } else {
                    stop_count = true;
                }
            }

            if (direction === "down") {
                current.y -= 1;
                if (this.#isSpaceOpen({x: current.x, y: current.y})) {
                    count++;
                } else {
                    stop_count = true;
                }
            }

            if (direction === "left") {
                current.x -= 1

                if (this.#isSpaceOpen({x: current.x, y: current.y})) {
                    count--;
                } else {
                    stop_count = true;
                }
            }

            if (direction === "right") {
                current.x += 1

                if (this.#isSpaceOpen({x: current.x, y: current.y})) {
                    count++;
                } else {
                    stop_count = true;
                }

            }
        }
        return Math.abs(count);
    }

    #isSpaceOpen({x, y}) {
        if (!this.#isInBounds({x, y})) {
            return false;
        }

        if (this.#coordinateContainsSnake({x, y})) {
            return false;
        }

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

    #utilGroupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
}

export default Move;
