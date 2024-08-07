const Player = (sign) => {
    this.sign = sign;
    const getSign = () => sign;
    return { getSign };
}

const gameBoard = (() => {
    let board = Array(9).fill('');

    const changeBoard = (sign, index) => {
        board[index] = sign;
    };

    const getBoard = (index) => board[index];

    const resetBoard = () => {
        board = Array(9).fill('');
    };

    return {changeBoard, getBoard, resetBoard};
});

const displayController = (() => {
    const message = document.querySelector('.message');
    const board = gameBoard();
    const player1 = Player('X');
    const player2 = Player('O');
    let currentPlayer = player1;

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        message.textContent = `Player ${currentPlayer.getSign()}'s turn`;
    };

    const play = (index) => {
        board.changeBoard(currentPlayer.getSign(), index);
        changePlayer();
    };

    const reset = () => {
        board.resetBoard();
        currentPlayer = player1;
    };

    return {play, reset};
});