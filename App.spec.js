import App from "./App.js";
import referee from "@sinonjs/referee";
const {assert} = referee;
import SampleResponse from "./sample-response.js";
import sampleResponse from "./sample-response.js";

describe("App", function () {
    it("Sanity tests", function () {
        const sut = new App();
        assert(sut instanceof App);
    });

    it("Returns up ", function () {
        const sut = new App();
        assert.equals(sut.move(sampleResponse), "up");
    });
});
