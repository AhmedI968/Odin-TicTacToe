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