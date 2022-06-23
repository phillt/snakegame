import Move from "./Move.js";

class App {

    constructor() {

    }

    move(body) {
        const mover = new Move(body.you, body.board.snakes, body.board);

        return mover.getMove();
    }
}

 export default App;
