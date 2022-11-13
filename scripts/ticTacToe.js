const gameBoard = (() => {
    const gameArray = [
        ,,,
        ,,,
        ,,,
    ];

    return { gameArray };
})();

const playerFactory = (sign, currentPlayer, movesMade, score) => {
    return { sign, currentPlayer, movesMade, score };
};

const gameController = (() => {
    const playerX = playerFactory("X", true, [], 0);
    const playerO = playerFactory("O", false, [], 0);
    const players = [playerX, playerO];
    let gameState = true;

    const resetGame = () => {
        gameController.playerX.score = 0;
        gameController.playerO.score = 0;
        gameBoard.gameArray = [
            ,,,
            ,,,
            ,,, 
        ];
        gameController.playerX.currentPlayer = true;
        gameController.playerO.currentPlayer = false;
        gameController.gameState = true;
        playerX.movesMade = [];
        playerO.movesMade = [];
        displayController.updateScoreDisplay();
        displayController.updateTurnDisplay();
        displayController.updateBoardDisplay();
        let newGameButton = document.querySelector('.new-game-button')
        newGameButton.classList.add('hidden-button');
    }

    const startNewGame = () => {
        gameBoard.gameArray = [
            ,,,
            ,,,
            ,,, 
        ];
        gameController.playerX.currentPlayer = true;
        gameController.playerO.currentPlayer = false;
        gameController.gameState = true;
        playerX.movesMade = [];
        playerO.movesMade = [];
        displayController.updateScoreDisplay();
        displayController.updateTurnDisplay();
        displayController.updateBoardDisplay();
        let newGameButton = document.querySelector('.new-game-button')
        newGameButton.classList.add('hidden-button');
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
                gameController.setResult("win");
                break
            }
            
            // if there's not a win, check to see if there's a tie
            if (includesAll(playerMoves, winningCombos[i]) == false) {
                // declare a tie if 9 moves have been made and all winning combos have been iterated over
                if (gameController.playerX.movesMade.length + gameController.playerO.movesMade.length == 9 && i == 7) {
                    console.log("Tie!")
                    gameController.setResult("tie");
                    break
                }
            }

            // if there's no win and a tie was not detected
            if (i == winningCombos.length - 1) {
                console.log("No win, next players turn!")
                gameController.setTurn(gameController.players);
                displayController.updateTurnDisplay();
            }
        }

    }

    const setResult = (result) => {
        // do stuff if this is called with a win result
        if (result == "win") {
            displayController.updateDisplayWin();
            let winningPlayer = gameController.getTurn(gameController.players);
            winningPlayer.score++;
            gameController.gameState = false;
            displayController.updateScoreDisplay();
        }

        // do other stuff if this is called with a tie result
        if (result == "tie") {
            displayController.updateDisplayTie();
            gameController.gameState = false;
        }
    }

    return { playerX, playerO, players, gameState, resetGame, startNewGame, getTurn, setTurn, recordMove, checkBoard, setResult }
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
     xScore.innerText = gameController.playerX.score;
     oScore.innerText = gameController.playerO.score;
    }

    const updateTurnDisplay = () => {
        let pTurn = document.querySelector('.game-console');
        let player = gameController.getTurn(gameController.players);
        pTurn.innerText = `PLAYER ${player.sign} TURN` 
    }

    const updateDisplayWin = () => {
        let gResult = document.querySelector('.game-console');
        let player = gameController.getTurn(gameController.players);
        let newGameButton = document.querySelector('.new-game-button')
        newGameButton.classList.remove('hidden-button');
        gResult.innerText = `PLAYER ${player.sign} WINS!`
    }

    const updateDisplayTie = () => {
        let gResult = document.querySelector('.game-console');
        gResult.innerText = `TIE GAME!`
        let newGameButton = document.querySelector('.new-game-button')
        newGameButton.classList.remove('hidden-button');
    }

    return { updateBoardDisplay, updateScoreDisplay, updateTurnDisplay, updateDisplayWin, updateDisplayTie }
})();