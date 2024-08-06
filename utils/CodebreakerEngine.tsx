import {GameConfig, debugMessage, GuessResult, GameStatus} from './CodebreakerEngineTypes';

export default class CodebreakerEngine {
    
    items: Array<string>;
    secretCode: Array<string>;
    currentStage: number;
    rounds: number;
    lives: number;
    guesses: Array<GuessResult>;
    debug : boolean;

    constructor(config: GameConfig = {
      items: ['1', '2', '3', '4', '5', '6', '7', '8'],
      secretCode: [],
      rounds: 8,
      lives: 3,
      debug: false
    }){
      this.items = config.items;
      this.secretCode = config.secretCode;
      this.currentStage = 1;
      this.rounds = config.rounds;
      this.lives = config.lives;
      this.guesses = [];
      this.debug = config.debug;

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
        roundsLeft: this.rounds,
        livesLeft: this.lives,
        gameOver: this.lives <= 0,
        gameWon: guessResult.solved
      }

    }
  
    checkGuess(guess: string[]): GuessResult {
        let perfectMatchesCount = 0;
        let perfectMatchPositions = [];
        let correctItemsCount = 0;
        const secretCodeCopy = [...this.secretCode];
        const guessCopy = [...guess];

        // Check for perfect matches
        for (let i = 0; i < this.secretCode.length; i++) {
            if (guess[i] === this.secretCode[i]) {
                perfectMatchesCount++;
                perfectMatchPositions[i] = true;
                secretCodeCopy[i] = guessCopy[i] = '';
            }else{
              perfectMatchPositions[i] = false;
            }
        }

        // Check for correct items in wrong positions
        for (let i = 0; i < guessCopy.length; i++) {
            if (guessCopy[i] !== null) {
                const index = secretCodeCopy.indexOf(guessCopy[i]);
                if (index !== -1) {
                    correctItemsCount++;
                    secretCodeCopy[index] = '';
                }
            }
        }
        correctItemsCount = correctItemsCount-perfectMatchesCount;

        this.debugMessage(["Guess Sent:", guess]);
        this.debugMessage(["Perfect Matched Found:", perfectMatchesCount]);
        this.debugMessage(["Incorrect Positions:", correctItemsCount]);
        this.debugMessage([ "Incorrect:", this.items.length - perfectMatchesCount - correctItemsCount]);
        this.debugMessage(["Matched Positions:", perfectMatchPositions]);
        
        return {
            solved: perfectMatchesCount === this.items.length,
            guess: guess,
            perfect: perfectMatchesCount,
            correct: correctItemsCount,
            incorrect: this.items.length - perfectMatchesCount - correctItemsCount,
            positions: perfectMatchPositions
        };
    }

    getGameStatus(): GameStatus {
      return {
        guessHistory: this.guesses,
        roundsLeft: this.rounds,
        livesLeft: this.lives,
        gameOver: this.lives <= 0,
        gameWon: this.guesses[this.guesses.length-1].solved
      }
    }

    debugMessage(message: debugMessage){
      this.debug ? console.log(message) : null;
    }
  }