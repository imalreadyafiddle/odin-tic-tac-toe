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
    let gameState = true;
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
        for (let i = 0; i < players.length; i++) {
            if (players[i].currentPlayer == false) {continue}
            else {return players[i]}
        }
    }

    const setTurn = (players) => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].currentPlayer == false) {players[i].currentPlayer = true}
            else {players[i].currentPlayer = false}
        }
    }

    const recordMove = (index) => {
        if (gameBoard.gameArray[index] != undefined || gameController.gameState == false) {
            console.log("Not a valid move!");
        }
        else {
            let player = gameController.getTurn(gameController.players)
            gameBoard.gameArray[index] = player.sign;
            player.movesMade.push(index);
            displayController.updateBoardDisplay();
            gameController.checkBoard(player);
        }
    }

    const checkBoard = (player) => {
        // bring in moves made by current player
        let playerMoves = player.movesMade;

        // possible winning index combos
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

        // iterate over winning combos, check playerObj.playerMoves for all values in each winning combo, do something if there's a win.
        for (let i = 0; i < winningCombos.length; i++) {

            let includesAll = (arr, values) => values.every(v => arr.includes(v));

            // delcare a win if all values of winningCombos[i] are in playerMoves
            if (includesAll(playerMoves, winningCombos[i]) == true) {
                console.log("Win!")
                // call setResult("win")
                break
            }
            
            // if there's not a win, check to see if there's a tie
            if (includesAll(playerMoves, winningCombos[i]) == false) {
                // declare a tie if 9 moves have been made and all winning combos have been iterated over
                if (gameController.playerX.movesMade.length + gameController.playerO.movesMade.length == 9 && i == 7) {
                    console.log("Tie!")
                    // call setResult("tie")
                    break
                }
            }

            if (i == winningCombos.length - 1) {
                console.log("No win, next players turn!")
                gameController.setTurn(gameController.players);
            }
        }

    }

    const setResult = (result) => {

    }

    return { playerX, playerO, players, playerScores, gameState, resetGame, startNewGame, getTurn, setTurn, recordMove, checkBoard, setResult }
})();

const displayController = (() => {

    const updateBoardDisplay = () => {
        let cells = Array.from(document.querySelectorAll('.game-cell'));
        for (let i = 0; i < cells.length; i++) {
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

    const updateDisplayWin = () => {
        // display end result, likely to be called by gameController.checkBoard
        let gResult = document.querySelector('.game-console');
        let player = gameController.getTurn(gameController.players);
        gResult.innerText = `PLAYER ${player.sign} WINS!`
    }

    return { updateBoardDisplay, updateScoreDisplay, updateTurnDisplay, updateDisplayWin }
})();