(() => {
    'use strict';

    class TicTacToe {
        static WINNING_LINES = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
            [0, 4, 8], [2, 4, 6],            // ななめ
        ];

        static GameStatus = Object.freeze({
            PROGRESS: 'progress',
            GAMESET: 'gameset',
            DRAW: 'draw',
        });

        #gameState = {};
        #domElements = {};

        constructor() {
            this.#domElements = {
                boardContainer: document.querySelector('[data-js-board]'),
                squares: document.querySelectorAll('[data-js-square]'),
                playerDisplay: document.getElementById('current-player'),
                resetBtn: document.getElementById('reset-btn'),
            };

            if (this.#domElements.boardContainer) {
                this.#domElements.boardContainer.addEventListener('click', (e) => this.#handleBoardClick(e));
            }

            if (this.#domElements.resetBtn) {
                this.#domElements.resetBtn.addEventListener('click', () => this.init());
            }

            this.init();
        }

        init() {
            this.#gameState = {
                boardData: Array(9).fill(null),
                currentPlayer: 1,
                isGameOver: false,
            };

            this.#render();
        }

        #handleBoardClick(event) {
            const square = event.target.closest('.square');
            if (!square) return;

            const index = Number(square.dataset.index);
            this.#makeMove(index);
        }

        #makeMove(index) {
            if (!this.#canPlace(index)) return;

            const { currentPlayer } = this.#gameState;

            this.#gameState.boardData[index] = currentPlayer;
            const status = this.#checkGameSet();

            if (status === TicTacToe.GameStatus.GAMESET) {
                this.#gameState.isGameOver = true;
                this.#render();
                setTimeout(() => alert(`プレイヤー ${currentPlayer} の勝ち！`), 10);
                return;
            }

            if (status === TicTacToe.GameStatus.DRAW) {
                this.#gameState.isGameOver = true;
                this.#render();
                setTimeout(() => alert(`引き分け！`), 10);
                return;
            }

            this.#gameState.currentPlayer = this.#getNextPlayer();
            this.#render();
        }

        #canPlace(index) {
            const { isGameOver, boardData } = this.#gameState;

            if (isGameOver) return false;
            if (index < 0 || index >= boardData.length) return false;
            if (boardData[index] !== null) return false;
            return true;
        }

        #checkGameSet() {
            const { boardData } = this.#gameState;

            for (const [a, b, c] of TicTacToe.WINNING_LINES) {
                if (boardData[a] !== null && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
                    return TicTacToe.GameStatus.GAMESET;
                }
            }

            if (!boardData.includes(null)) {
                return TicTacToe.GameStatus.DRAW;
            }

            return TicTacToe.GameStatus.PROGRESS;
        }

        #getNextPlayer() {
            return this.#gameState.currentPlayer === 1 ? 2 : 1;
        }

        #render() {
            const { boardData, currentPlayer } = this.#gameState;
            const { squares, playerDisplay } = this.#domElements;

            // 盤面
            squares.forEach((square) => {
                const squareIndex = square.dataset.index;
                const player = boardData[squareIndex];
                square.textContent = player === 1 ? '⭕' : player === 2 ? '❌' : '';
                square.classList.toggle('deployed', player !== null);
            });

            // ターンメッセージ
            if (playerDisplay) {
                playerDisplay.textContent = currentPlayer;
            }
        }
    }

    const game = new TicTacToe();
})();
