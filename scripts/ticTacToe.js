const gameBoard = (() => {
    const gameArray = [
        ,,,
        ,,,
        ,,,
    ];
    return { gameArray };
})();

const playerFactory = (sign, currentPlayer) => {
    return { sign, currentPlayer };
};

const gameController = (() => {
    const playerX = playerFactory("X", true);
    const playerO = playerFactory("O", false);
    
    const setTurn = (player) => {
        // make this actually correctly set the turn instead of
        // demoing that you can just change the f***ing property
        // in the first place, because JS makes this a f***ing
        // nightmare to do in a way that makes sense.
        player.currentPlayer = true;
    } 

    return { playerX, playerO, setTurn }
})();