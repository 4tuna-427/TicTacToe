export class Board {
    #cell = [];

    constructor() {
        this.reset();
    }

    reset() {
        this.#cell = Array(9).fill(null);
    }

    canPlace(index) {
        if (index < 0 || index >= this.#cell.length) return false;
        return this.#cell[index] === null;
    }

    place(index, player) {
        if (!this.canPlace(index)) return false;
        this.#cell[index] = player;
        return true;
    }

    getCells() {
        return [...this.#cell];
    }
}
