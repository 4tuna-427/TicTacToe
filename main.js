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

let sceneName = '';
let currentPlayerNo = 1;
let board = ['', '', '', '', '', '', '', '', ''];

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];

    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.classList.remove('deployed');
        square.textContent = '';
    });
}

function resetGame() {
    currentPlayerNo = 1;
    console.log(currentPlayerNo);
    resetBoard();
}

function gameStart() {
    resetGame();
    turnStart();
}

function checkGameSet(board, playerNo) {
    for (const [a, b, c] of WINNING_LINES) {
        const squareA = board[a];
        const squareB = board[b];
        const squareC = board[c];

        if (squareA !== '' && squareA === squareB && squareA === squareC) {
            return GameStatus.GAMESET;
        }
    }

    if (!board.includes('')) {
        return GameStatus.DRAW;
    }

    return GameStatus.PROGRESS;
}

function markSquare(square) {
    const squareIndex = square.dataset.index;
    const isEmptySquare = square.classList.contains('square') && !square.classList.contains('deployed');

    if (isEmptySquare) {
        document.removeEventListener('click', handleClickSquare);

        square.classList.add('deployed');
        square.textContent = (currentPlayerNo === 1) ? '⭕' : '❌';
        board[squareIndex] = currentPlayerNo;

        const gameStatus = checkGameSet(board, currentPlayerNo);
        switch (gameStatus) {
            case GameStatus.GAMESET:
                alert('Win' + currentPlayerNo);
                gameStart();
                return;

            case GameStatus.DRAW:
                alert('darw');
                gameStart();
                return;
        }

        const nextPlayerNo = (currentPlayerNo === 1) ? 2 : 1;
        currentPlayerNo = nextPlayerNo;
        turnStart();
    }

    return false;
}

function handleClickSquare(event) {
    const clickedSquare = event.target;
    markSquare(clickedSquare);
}

// 引数で指定したプレイヤーのターンを開始
function turnStart() {
    const currentPlayerLabel = document.getElementById('current-player');
    if (currentPlayerLabel) {
        currentPlayerLabel.textContent = currentPlayerNo;
    }
    console.log('text updated., ', currentPlayerNo);

    // 有効なマスをクリック時、マークする処理をセット
    document.addEventListener('click', handleClickSquare);
}

// DOMの構造が完全に読み込まれた際のイベント
document.addEventListener('DOMContentLoaded', () => {

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', gameStart);
    }

    gameStart();
});
