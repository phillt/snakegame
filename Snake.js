class Snake {
    #body;
    #head;

    constructor() {
    }

    set body(body) {
        this.#body = body;
    }

    set head(head) {
        this.#head = head;
    }
}

export default Snake;
