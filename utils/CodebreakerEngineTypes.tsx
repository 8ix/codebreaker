export type GameConfig = {
    passwordCollection: PasswordCollection | null,
    rounds: number,
    lives: number,
    debug: boolean,
}

export type Password = {
    password: string;
    passwordHint: string;
    passwordClue1: string;
    passwordClue2: string;
    passwordClue3: string;
}

export type Clues = {
    passwordHint: string;
    passwordClue1: string;
    passwordClue2: string;
    passwordClue3: string;
}

export type PasswordCollection = Array<Password>;

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
    clues: Clues | null;
    roundsLeft: number;
    livesLeft: number;
    gameOver: boolean;
    gameWon: boolean;
}
