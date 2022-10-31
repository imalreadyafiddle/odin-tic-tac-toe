const gameBoard = (() => {
    const gameArray = [
        ,,,
        ,,,
        ,,,
    ];

    return { gameArray };
})();

const playerFactory = (sign, currentPlayer, movesMade) => {
    return { sign, currentPlayer, movesMade };
};

const gameController = (() => {
    const playerX = playerFactory("X", true, []);
    const playerO = playerFactory("O", false, []);
    const players = [playerX, playerO];
    const gameState = true;
    const playerScores = {"X": 0, "O": 0}

    const resetGame = () => {
        gameController.playerScores.O = 0;
        gameController.playerScores.X = 0;
        gameBoard.gameArray = [
            ,,,
            ,,,
            ,,, 
        ];
        playerX.currentPlayer = true;
        playerO.currentPlayer = false;
        gameState = true;
        playerX.movesMade = [];
        playerO.movesMade = [];
        displayController.updateScoreDisplay();
        displayController.updateTurnDisplay();
        displayController.updateBoardDisplay();
    }

    const startNewGame = () => {
        gameBoard.gameArray = [
            ,,,
            ,,,
            ,,, 
        ];
        playerX.currentPlayer = true;
        playerO.currentPlayer = false;
        gameState = true;
        playerX.movesMade = [];
        playerO.movesMade = [];
        displayController.updateScoreDisplay();
        displayController.updateTurnDisplay();
        displayController.updateBoardDisplay();
    }

    const getTurn = (players) => {
        for (i = 0; i < players.length; i++) {
            if (players[i].currentPlayer == false) {continue}
            else {return players[i]}
        }
    }

    const setTurn = (players) => {
        for (i = 0; i < players.length; i++) {
            if (players[i].currentPlayer == false) {players[i].currentPlayer = true}
            else {players[i].currentPlayer = false}
        }
    }

    const recordMove = (index) => {
        // add and gameState != over maybe? need gameState variable.
        if (gameBoard.gameArray[index] != undefined && gameController.gameState == false) {
            console.log("Not a valid move!");
        }
        else {
            let player = gameController.getTurn(gameController.players)
            gameBoard.gameArray[index] = player.sign;
            player.movesMade.push(index);
            gameController.checkBoard(player);
        }
    }

    const checkBoard = (player) => {
        // possible winning index combos
        let playerMoves = player.movesMade;
        
        const winningCombos = [
            // across
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
    
            // down
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
    
            //diagonally
            [0, 4, 8],
            [2, 4, 6]
        ]

        // iterate over winning combos, check player moves for all values in each winning combo, do something if there's a win.

    }

    return { playerX, playerO, players, playerScores, gameState, resetGame, startNewGame, getTurn, setTurn, recordMove, checkBoard }
})();

const displayController = (() => {

    const updateBoardDisplay = () => {
        let cells = Array.from(document.querySelectorAll('.game-cell'));
        for (i = 0; i < cells.length; i++) {
            if (gameBoard.gameArray[i] == undefined) {
                cells[i].innerHTML = "&nbsp;"
            }
            else { 
                cells[i].innerHTML = gameBoard.gameArray[i];
            }
        }
    }

    const updateScoreDisplay = () => {
     let oScore = document.querySelector('.o-score-num');
     let xScore = document.querySelector('.x-score-num');
     xScore.innerText = gameController.playerScores.X;
     oScore.innerText = gameController.playerScores.O;
    }

    const updateTurnDisplay = () => {
        let pTurn = document.querySelector('.game-console');
        let player = gameController.getTurn(gameController.players);
        pTurn.innerText = `PLAYER ${player.sign} TURN` 
    }

    const updateResultDisplay = () => {
        // display end result, likely to be called by gameController.checkBoard
        let gResult = document.querySelector('.game-console');
        let player = gameController.getTurn(gameController.players);
        gResult.innerText = `PLAYER ${player.sign} WINS!`
    }

    return { updateBoardDisplay, updateScoreDisplay, updateTurnDisplay, updateResultDisplay }
})();