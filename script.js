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

    const getGameBoard = () => board;

    const resetBoard = () => {
        board = Array(9).fill('');
    };

    return {changeBoard, getBoard, resetBoard, getGameBoard};
})();


const gameController = (() => {
    const player1 = Player('X');
    const player2 = Player('O'); 
    let currentPlayer = player1;

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = (sign) => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6] // diagonal
        ];

        return winningCombos.some(combo => {
            return combo.every(index => gameBoard.getBoard(index) === sign);
        });
    };

    const checkDraw = () => {
        return gameBoard.getGameBoard().every(cell => cell !== '');
    };

    const playGame = (index) => {
        if (gameBoard.getBoard(index) === '') {
            gameBoard.changeBoard(currentPlayer.getSign(), index);
            displayController.updateBoard();

            if (checkWinner(currentPlayer.getSign())) {
                displayController.setMessage(`Player ${currentPlayer.getSign()} wins!`);
                displayController.setGameOver(true);
            } else if (checkDraw()) {
                displayController.setMessage('It\'s a draw!');
                displayController.setGameOver(true);
            } else {
                changePlayer();
            }
        } else return;
    };

    return {playGame};
})();

const displayController = (() => {
    const board = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const resetBtn = document.querySelector('.reset');
    let isGameOver = false;

    board.forEach(cell => cell.addEventListener('click', (event) => {
        if (getGameOver()) return;
        gameController.playGame(event.target.id)
    }));

    const updateBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i].textContent = gameBoard.getBoard(i);
        };
    };

    const setMessage = (msg) => {
        message.textContent = msg;
    };

    resetBtn.addEventListener('click', () => {
        gameBoard.resetBoard();
        updateBoard();
        setMessage("Player X's Turn");
        setGameOver(false);
    });

    const getGameOver = () => isGameOver;

    const setGameOver = (bool) => {
        isGameOver = bool;
    };

    return {updateBoard, setMessage, getGameOver, setGameOver};
})();

