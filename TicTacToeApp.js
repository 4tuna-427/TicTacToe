import { Board } from './Board.js';
import { GameJudge } from './GameJudge.js';
import { GameUI } from './GameUI.js';

export class TicTacToeApp {

    #board = null;
    #ui = null;
    #currentPlayer = 1;
    #isGameOver = false;

    constructor() {
        this.#board = new Board();
        this.#ui = new GameUI();

        this.#ui.bindSquareClick((index) => this.#handleMove(index));
        this.#ui.bindResetBtnClick(() => this.#handleReset())

        this.#handleReset();
    }

    #getState() {
        return {
            cells: this.#board.getCells(),
            currentPlayer: this.#currentPlayer,
            isGameOver: this.#isGameOver,
        }
    }

    #handleMove(index) {
        if (this.#isGameOver) return;
        if (!this.#board.place(index, this.#currentPlayer)) return;

        this.#ui.render(this.#getState());

        const status = GameJudge.checkStatus(this.#board.getCells());

        // 勝敗判定
        if (status === GameJudge.Status.WIN) {
            this.#isGameOver = true;
            this.#ui.showWinner(this.#currentPlayer);
            return;
        }

        if (status === GameJudge.Status.DRAW) {
            this.#isGameOver = true;
            this.#ui.showDraw();
            return;
        }

        // プレイヤーを交代
        this.#currentPlayer = this.#getNextPlayer();
        this.#ui.render(this.#getState());
    }

    #handleReset() {
        this.#board.reset();
        this.#currentPlayer = 1;
        this.#isGameOver = false;

        this.#ui.render(this.#getState());
    }

    #getNextPlayer() {
        return this.#currentPlayer === 1 ? 2 : 1;
    }
}
