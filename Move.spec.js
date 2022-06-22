import referee from "@sinonjs/referee";
import Move from "./Move.js";
const { assert } = referee;

describe("Move", function () {
    it("Initializes", function () {
        const sut = new Move();
        assert(sut instanceof Move);
    });
});
