document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const restartButton = document.getElementById('restart-button');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    function handleCellClick() {
        const cellIndex = parseInt(this.getAttribute('data-index'));

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        this.innerText = currentPlayer;
        
        if (checkWin(currentPlayer)) {
            endGame(`${currentPlayer} wins!`);
            return;
        }

        if (checkDraw()) {
            endGame('It\'s a draw!');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin(player) {
        return winConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === player;
            });
        });
    }

    function checkDraw() {
        return gameState.every(cell => {
            return cell !== '';
        });
    }

    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.innerText = '';
        });
        resultScreen.style.display = 'none';
        board.style.display = 'block';
    }

    function endGame(message) {
        gameActive = false;
        resultMessage.innerText = message;
        resultScreen.style.display = 'block';
        board.style.display = 'none';
    }
});
