'use strict';

const WINNING_LINES = [
    // 横
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // 縦
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // ななめ
    [0, 4, 8],
    [2, 4, 6],
];

const GameStatus = Object.freeze({
    PROGRESS: 'progress',
    GAMESET: 'gameset',
    DRAW: 'draw',
});

let currentPlayer = 1;
let boardData = Array(9).fill(null);
let isGameOver = false;

const squares = document.querySelectorAll('[data-js-square]');
const playerDisplay = document.getElementById('current-player');

function checkGameSet() {
    for (const [a, b, c] of WINNING_LINES) {
        const squareA = boardData[a];
        const squareB = boardData[b];
        const squareC = boardData[c];

        if (squareA !== null && squareA === squareB && squareA === squareC) {
            return GameStatus.GAMESET;
        }
    }

    if (!boardData.includes(null)) {
        return GameStatus.DRAW;
    }

    return GameStatus.PROGRESS;
}

function handleBoardClick(event) {
    const square = event.target.closest('.square'); // クリックしたマス
    // マス以外をクリックした場合は無視
    if (!square || isGameOver) return;

    const index = Number(square.dataset.index); // マスのindex
    // 空きマス以外をクリックした場合は無視
    if (boardData[index] !== null) return;

    boardData[index] = currentPlayer;

    const status = checkGameSet();

    // 勝利時
    if (status === GameStatus.GAMESET) {
        isGameOver = true;
        updateUI();
        setTimeout(() => alert(`プレイヤー ${currentPlayer} の勝ち！`), 10);
        return;
    }

    // 引き分け時
    if (status === GameStatus.DRAW) {
        isGameOver = true;
        updateUI();
        setTimeout(() => alert(`引き分け！`), 10);
        return;
    }

    // 手番交代
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateUI();
}

function updateUI() {
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

function resetGame() {
    currentPlayer = 1;
    isGameOver = false;
    boardData = Array(9).fill(null);
    updateUI();
}

const boardContainer = document.querySelector('[data-js-board]');
if (boardContainer) {
    boardContainer.addEventListener('click', handleBoardClick);
}

const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
}

resetGame();
