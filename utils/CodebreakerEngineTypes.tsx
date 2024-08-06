export type GameConfig = {
    items: Array<string>,
    secretCode: Array<string>,
    rounds: number,
    lives: number,
    debug: boolean
}

export type debugMessage = (string | number | Array<string> | Array<boolean>)[];

export type GuessResult = {
    solved: boolean,
    guess: Array<string>;
    perfect: number;
    correct: number;
    incorrect: number;
    positions: Array<boolean>;
}

export type GameStatus = {
    guessHistory: Array<GuessResult>;
    roundsLeft: number;
    livesLeft: number;
    gameOver: boolean;
    gameWon: boolean;
}
