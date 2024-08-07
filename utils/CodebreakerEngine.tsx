import {GameConfig, debugMessage, GuessResult, GameStatus, clues} from './CodebreakerEngineTypes';

export default class CodebreakerEngine {
    
    items: Array<string>;
    secretCode: Array<string>;
    currentStage: number;
    rounds: number;
    lives: number;
    guesses: Array<GuessResult>;
    debug : boolean;
    clues: clues;

    constructor(config: GameConfig = {
      items: ['1', '2', '3', '4', '5', '6', '7', '8'],
      secretCode: [],
      rounds: 8,
      lives: 3,
      debug: false,
      clues: null
    }){

      if(config.items.length > 0){
        this.items = config.items;
      }else{
        this.items = config.secretCode;
      }

      this.secretCode = config.secretCode;
      this.currentStage = 1;
      this.rounds = config.rounds;
      this.lives = config.lives;
      this.guesses = [];
      this.debug = config.debug;
      this.clues = config.clues;

      config.secretCode.length === 0 ? this.generateSecretCode() : null;
      this.debugMessage(["Game Initiated:", this.secretCode]);
    }
  
    generateSecretCode() {
      this.secretCode = this.shuffleArray(this.items);
      this.debugMessage(["The Secret Code is:", this.secretCode]);
    }
    
    shuffleArray(array: Array<string>) : Array<string> {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    makeGuess(guess: Array<string>): GameStatus  {
      let guessResult = this.checkGuess(guess);
      this.guesses.push(guessResult);

      !guessResult.solved && this.rounds != 0 ? this.rounds-- : null;
      this.rounds === 0 ? this.lives-- : null;
      this.debugMessage(["Rounds Remaining:",this.rounds, "Lives Remaining:",this.lives ]);
      this.lives === 0 ? this.debugMessage(["Game Over"]) : null;
    
      guessResult.solved ? this.debugMessage(["Puzzle Solved"]) : null;

      return {
        guessHistory: this.guesses,
        clues: this.clues,
        roundsLeft: this.rounds,
        livesLeft: this.lives,
        gameOver: this.lives <= 0,
        gameWon: guessResult.solved
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
        gameWon: this.guesses.length > 0 ? this.guesses[this.guesses.length-1].solved : false
      }
    }

    getGuessHistory(): Array<GuessResult> {
      return this.guesses;
    }

    debugMessage(message: debugMessage){
      this.debug ? console.log(message) : null;
    }
  }