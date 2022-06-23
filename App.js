import Move from "./Move.js";
import EatFoodMove from "./EatFoodMove.js";

class App {

    constructor() {

    }

    move(body) {
        // const mover = new EatFoodMove(body.you, body.board.snakes, body.board);
        const mover = new Move(body.you, body.board.snakes, body.board);

        return mover.getMove();
    }
}

 export default App;
