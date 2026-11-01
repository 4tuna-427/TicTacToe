(() => {
    'use strict';

    //============================================================
    // 1. 定数定義
    //============================================================
    const WINNING_LINES = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
        [0, 4, 8], [2, 4, 6],            // ななめ
    ];

    const GameStatus = Object.freeze({
        PROGRESS: 'progress',
        GAMESET: 'gameset',
        DRAW: 'draw',
    });

    //============================================================
    // 2. 状態
    //============================================================
    function createInitialState() {
        return {
            boardData: Array(9).fill(null),
            currentPlayer: 1,
            isGameOver: false,
        };
    }

    let gameState = createInitialState();

    //============================================================
    // 3. DOMキャッシュ
    //============================================================
    const domElements = {
        boardContainer: document.querySelector('[data-js-board]'),
        squares: document.querySelectorAll('[data-js-square]'),
        playerDisplay: document.getElementById('current-player'),
        resetBtn: document.getElementById('reset-btn'),
    };

    //============================================================
    // 4. 純粋関数
    //============================================================
    /**
     * マスに配置可能か
     * @param {*} board
     * @param {*} index
     * @param {*} isGameOver
     * @returns
     */
    function canPlace(board, index, isGameOver) {
        if (isGameOver) return false;
        if (index < 0 || index >= board.length) return false;
        if (board[index] !== null) return false;
        return true;
    }

    /**
     * ゲーム判定
     * @param {*} board
     * @returns
     */
    function checkGameSet(board) {
        for (const [a, b, c] of WINNING_LINES) {
            if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
                return GameStatus.GAMESET;
            }
        }

        if (!board.includes(null)) {
            return GameStatus.DRAW;
        }

        return GameStatus.PROGRESS;
    }

    /**
     * 次のプレイヤーを取得
     * @param {*} currentPlayer
     * @returns
     */
    function getNextPlayer(currentPlayer) {
        return currentPlayer === 1 ? 2 : 1;
    }

    //============================================================
    // 5. 描画処理
    //============================================================
    function render(state, domElements) {
        const { boardData, currentPlayer } = state;
        const { squares, playerDisplay } = domElements;

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

    //============================================================
    // 6. イベントハンドラ
    //============================================================
    function initGame() {
        gameState = createInitialState();
        render(gameState, domElements);
    }

    /**
     * ボードクリック時
     * @param {*} event
     * @returns
     */
    function handleBoardClick(event) {
        const square = event.target.closest('.square');
        if (!square) return;

        const index = Number(square.dataset.index);

        if (!canPlace(gameState.boardData, index, gameState.isGameOver)) return;

        gameState.boardData[index] = gameState.currentPlayer;

        const status = checkGameSet(gameState.boardData);

        // 勝利時
        if (status === GameStatus.GAMESET) {
            gameState.isGameOver = true;
            render(gameState, domElements);
            setTimeout(() => alert(`プレイヤー ${gameState.currentPlayer} の勝ち！`), 10);
            return;
        }

        // 引き分け時
        if (status === GameStatus.DRAW) {
            gameState.isGameOver = true;
            render(gameState, domElements);
            setTimeout(() => alert(`引き分け！`), 10);
            return;
        }

        // 手番交代
        gameState.currentPlayer = getNextPlayer(gameState.currentPlayer);
        render(gameState, domElements);
    }

    //============================================================
    // 7. 初期化・イベント登録（エントリポイント）
    //============================================================
    if (domElements.boardContainer) {
        domElements.boardContainer.addEventListener('click', handleBoardClick);
    }

    if (domElements.resetBtn) {
        domElements.resetBtn.addEventListener('click', initGame);
    }

    initGame();
})();
