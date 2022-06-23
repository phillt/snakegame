import referee from "@sinonjs/referee";
import Move from "./Move.js";
import sampleResponse from "./sample-response.js";
const { assert } = referee;


describe("Move", function () {
    it("Initializes", function () {
        const sut = new Move(sampleResponse.you, sampleResponse.board.snakes, sampleResponse.board);
        assert.equals(sut.getMove(), "up");
    });
});


