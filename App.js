import SnakeRequest from "./SnakeRequest.js";
import Move from "./Move.js";

class App {

    constructor() {

    }

    move(body) {
        const requestBody = new SnakeRequest(body);
        const getBoard = requestBody.board;

        const mover = new Move(requestBody.mySnake, requestBody.allSnakes, requestBody.board);

    }
}

 export default App;
