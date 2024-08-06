import React, { useContext, useState, useEffect, ReactElement, useRef, useCallback } from 'react';
import { GameContext } from '../../context/GameContext';

const PasswordEntryBoxes = () => {
    const { gameEngine, isLoading } = useContext(GameContext);
    const [guessCount, setGuessCount] = useState<number>(0);
    const [guessValues, setGuessValues] = useState<string[]>([]);
    const [characterBoxes, setCharacterBoxes] = useState<ReactElement[]>([]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Set the number of character boxes to match the length of the secret code
    useEffect(() => {
        if (gameEngine && !isLoading) {
            setGuessCount(gameEngine.secretCode.length);
        }
    }, [gameEngine, isLoading]);

    // Create the character boxes
    useEffect(() => {
        const newCharacterBoxes: ReactElement[] = [];
        for(let i = 0; i < guessCount; i++) {
            newCharacterBoxes.push(
                <input 
                    type="text" 
                    key={i} 
                    ref={(el) => setInputRef(el, i)}
                    maxLength={1} 
                    style={{ width: '30px', marginRight: '5px' }} 
                    onChange={(e) => handleInputChange(i, e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(i, e)}
                />
            );
        }
        setCharacterBoxes(newCharacterBoxes);
    }, [guessCount]);

    // Update the guess values array when a character box is changed
    const handleInputChange = (index: number, value: string) => {
        const newGuessValues = [...guessValues];
        newGuessValues[index] = value;
        setGuessValues(newGuessValues);

        if (value && index < guessCount - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const setInputRef = useCallback((el: HTMLInputElement | null, index: number) => {
        inputRefs.current[index] = el;
    }, []);

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newGuessValues = [...guessValues];
            
            if (newGuessValues[index]) {
                // If current input has a value, clear it
                newGuessValues[index] = '';
                if (inputRefs.current[index]) {
                    inputRefs.current[index]!.value = '';
                }
            } else if (index > 0) {
                // If current input is empty and it's not the first input, clear previous input and move focus
                newGuessValues[index - 1] = '';
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1]!.value = '';
                    inputRefs.current[index - 1]!.focus();
                }
            }
            
            // Special handling for the last input box
            if (index === guessCount - 1 && newGuessValues[index] !== '') {
                newGuessValues[index] = '';
                if (inputRefs.current[index]) {
                    inputRefs.current[index]!.value = '';
                }
            }
            setGuessValues(newGuessValues);
        }
    };

    const handleSubmit = () => {
      
        if (guessValues.some(value => value === '')) {
            alert('Please fill in all boxes before submitting.');
            return;
        }
        // Make a guess through the game engine
        if (gameEngine) {
            const result = gameEngine.makeGuess(guessValues);
            
            console.log('Guess result:', result);
            //Some more Logic to follow here.

            // Clear all input values and set focus to the first input
            inputRefs.current.forEach((inputRef, index) => {
                if (inputRef) {
                    inputRef.value = '';
                    if (index === 0) {
                        inputRef.focus();
                    }
                }
            });
        }
    };

    if (isLoading || !gameEngine) {
        return null;
    }

    return (
        <div>
            {characterBoxes}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default PasswordEntryBoxes;