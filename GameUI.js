export class GameUI {
    #elements = {};

    constructor() {
        this.#elements = {
            boardContainer: document.querySelector('[data-js-board]'),
            squares: document.querySelectorAll('[data-js-square]'),
            playerDisplay: document.querySelector('[data-js-current-player]'),
            resetBtn: document.querySelector('[data-js-reset-btn]'),
        };
    }

    render(state) {
        this.#elements.squares.forEach((square) => {
            const index = Number(square.dataset.index);
            const player = state.cells[index];

            square.textContent = player === 1 ? '⭕' : player === 2 ? '❌' : '';
            square.classList.toggle('deployed', player !== null);
        });

        if (this.#elements.playerDisplay) {
            this.#elements.playerDisplay.textContent = state.currentPlayer;
        }
    }

    showWinner(player) {
        setTimeout(() => alert(`プレイヤー ${player} の勝ち！`), 10);
    }

    showDraw() {
        setTimeout(() => alert('引き分け！'), 10);
    }

    bindSquareClick(onSquareClick) {
        this.#elements.boardContainer.addEventListener('click', (e) => {
            this.#handleBoardClick(e, onSquareClick);
        });
    }

    bindResetBtnClick(onResetClick) {
        this.#elements.resetBtn.addEventListener('click', onResetClick);
    }

    #handleBoardClick(event, onSquareClick) {
        const square = event.target.closest('.square');
        if (!square) return;

        const index = Number(square.dataset.index);
        onSquareClick(index);
    }
}
