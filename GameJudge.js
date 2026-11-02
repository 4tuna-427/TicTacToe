export class GameJudge {
    static Status = Object.freeze({
        PROGRESS: 'progress',
        WIN: 'win',
        DRAW: 'draw',
    });

    static WINNING_LINES = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
        [0, 4, 8], [2, 4, 6],            // ななめ
    ];

    static checkStatus(cells) {
        const hasWon = GameJudge.WINNING_LINES.some(([a, b, c]) => (
            cells[a] !== null &&
            cells[a] === cells[b] &&
            cells[a] === cells[c]
        ));

        if (hasWon) return GameJudge.Status.WIN;
        if (!cells.includes(null)) return GameJudge.Status.DRAW;

        return GameJudge.Status.PROGRESS;
    }
}
