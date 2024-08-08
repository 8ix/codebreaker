import {GameConfig, debugMessage, GuessResult, GameStatus, PasswordCollection, Clues} from './CodebreakerEngineTypes';

export default class CodebreakerEngine {

    secretCode: Array<string>;
    currentStage: number;
    roundsPerStage: number;
    rounds: number;
    lives: number;
    guesses: Array<GuessResult>;
    debug : boolean;
    clues: Clues | null;
    roundComplete: boolean;
    passwordCollection: PasswordCollection | null;

    constructor(config: GameConfig = {
      rounds: 8,
      lives: 3,
      debug: false,
      passwordCollection: null
    }){

      // Initialize the game and set game configuration settings
      this.roundsPerStage = config.rounds;
      this.lives = config.lives;
      this.debug = config.debug;
      this.currentStage = 0;
      this.passwordCollection = config.passwordCollection;

      // Initialize first round settings
      this.secretCode = [];
      this.rounds = config.rounds;
      this.guesses = [];
      this.clues = null;
      this.roundComplete = false;

      this.newRound();
      this.debugMessage(["Game Initiated"]);
    }

    newRound(): void {
      if (this.passwordCollection && this.passwordCollection.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.passwordCollection.length);
        const selectedPassword = this.passwordCollection[randomIndex];

        this.secretCode = selectedPassword.password.split('');
        this.clues = {
          passwordHint: selectedPassword.passwordHint,
          passwordClue1: selectedPassword.passwordClue1,
          passwordClue2: selectedPassword.passwordClue2,
          passwordClue3: selectedPassword.passwordClue3
        };
        this.passwordCollection.splice(randomIndex, 1);
      } else {
        this.secretCode = [];
        this.clues = null;
      }
      
      this.rounds = this.roundsPerStage;
      this.guesses = [];
      this.roundComplete = false;
      this.debugMessage(["New Round Started"]);
    }
    
    makeGuess(guess: Array<string>): GameStatus  {
      let guessResult = this.checkGuess(guess);
      this.guesses.push(guessResult);

      !guessResult.solved && this.rounds != 0 ? this.rounds-- : null;
      this.rounds === 0 ? this.lives-- : null;
      this.debugMessage(["Rounds Remaining:",this.rounds, "Lives Remaining:",this.lives ]);
      this.lives === 0 ? this.debugMessage(["Game Over"]) : null;
    
      guessResult.solved ? this.debugMessage(["Puzzle Solved"]) : null;
      guessResult.solved ? this.currentStage++ : null;

      return {
        guessHistory: this.guesses,
        clues: this.clues,
        roundsLeft: this.rounds,
        livesLeft: this.lives,
        gameOver: this.lives <= 0,
        gameWon: guessResult.solved,
        currentStage: this.currentStage
      }

    }
  
    checkGuess(guess: string[]): GuessResult {
      const secretCodeCopy: Array<string | null> = this.secretCode.map(char => char.toLowerCase());
      const guessCopy: Array<string | null> = guess ? guess.map(char => char.toLowerCase()) : [];
  
      // Initialize color codes array
      let colorCodes = new Array(this.secretCode.length).fill('red');
  
      // Check for perfect matches
      for (let i = 0; i < this.secretCode.length; i++) {
          if (guessCopy[i] === secretCodeCopy[i]) {
              colorCodes[i] = 'green';
              secretCodeCopy[i] = null;
              guessCopy[i] = null;
          }
      }
  
      // Check for correct letters in wrong positions
      for (let i = 0; i < this.secretCode.length; i++) {
          if (guessCopy[i] !== null) {
              const index = secretCodeCopy.indexOf(guessCopy[i]);
              if (index !== -1) {
                  colorCodes[i] = 'yellow';
                  secretCodeCopy[index] = null;
              }
          }
      }
  
      const perfectMatches = colorCodes.filter(color => color === 'green').length;
      const correctLetters = colorCodes.filter(color => color === 'yellow').length;
      const incorrectLetters = colorCodes.filter(color => color === 'red').length;
  
      this.debugMessage(["Guess Sent:", guess]);
      this.debugMessage(["Perfect Matches Found:", perfectMatches]);
      this.debugMessage(["Incorrect Positions:", correctLetters]);
      this.debugMessage(["Incorrect:", incorrectLetters]);
      this.debugMessage(["Matched Positions:", colorCodes]);
      
      return {
          solved: perfectMatches === this.secretCode.length,
          guess: guess,
          perfect: perfectMatches,
          correct: correctLetters,
          incorrect: incorrectLetters,
          positions: colorCodes
      };
  }

    getGameStatus(): GameStatus {
      return {
        guessHistory: this.guesses,
        clues: this.clues,
        roundsLeft: this.rounds,
        livesLeft: this.lives,
        gameOver: this.lives <= 0,
        gameWon: this.guesses.length > 0 ? this.guesses[this.guesses.length-1].solved : false,
        currentStage: this.currentStage
      }
    }

    getGuessHistory(): Array<GuessResult> {
      return this.guesses;
    }

    debugMessage(message: debugMessage){
      this.debug ? console.log(message) : null;
    }
  }