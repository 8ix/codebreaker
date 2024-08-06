import React, { useContext, useState, useEffect, ReactElement, useRef, useCallback } from 'react';
import { GameContext } from '../../context/GameContext';
import { GameStatus } from '../../utils/CodebreakerEngineTypes';

const PasswordEntryBoxes = () => {
    const { gameEngine, isLoading, updateGameVersion } = useContext(GameContext);
    const [characterCount, setCharacterCount] = useState<number>(0);
    const [guessValues, setGuessValues] = useState<string[]>([]);
    const [lastResult, setLastResult] = useState<GameStatus | null>(null);
    const [characterBoxes, setCharacterBoxes] = useState<ReactElement[]>([]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Set the number of character boxes to match the length of the secret code
    useEffect(() => {
        if (gameEngine && !isLoading) {
            setCharacterCount(gameEngine.secretCode.length);
            setGuessValues(new Array(gameEngine.secretCode.length).fill(''));
        }
    }, [gameEngine, isLoading]);

    const setInputRef = useCallback((el: HTMLInputElement | null, index: number) => {
        inputRefs.current[index] = el;
    }, []);

    // Update the guess values array when a character box is changed
    const handleInputChange = useCallback((index: number, value: string) => {
        setGuessValues(prevValues => {
            const newGuessValues = [...prevValues];
            newGuessValues[index] = value;
            return newGuessValues;
        });

        if (inputRefs.current[index]) {
            inputRefs.current[index]!.value = value;
        }

        if (value && index < characterCount - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [characterCount])

    const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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
            if (index === characterCount - 1 && newGuessValues[index] !== '') {
                newGuessValues[index] = '';
                if (inputRefs.current[index]) {
                    inputRefs.current[index]!.value = '';
                }
            }
            setGuessValues(newGuessValues);
        }
    }, [characterCount, guessValues]);

    // Create the character boxes
    useEffect(() => {
        const newCharacterBoxes: ReactElement[] = [];
        for(let i = 0; i < characterCount; i++) {
            newCharacterBoxes.push(
                <input 
                    type="text" 
                    key={i} 
                    ref={(el) => setInputRef(el, i)}
                    maxLength={1} 
                    value={guessValues[i] || ''}
                    style={{ width: '30px', marginRight: '5px' }} 
                    onChange={(e) => handleInputChange(i, e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(i, e)}
                />
            );
        }
        setCharacterBoxes(newCharacterBoxes);
    }, [characterCount, guessValues, setInputRef]);

    
    const handleSubmit = () => {
        if (guessValues.some(value => value === '')) {
            alert('Please fill in all boxes before submitting.');
            return;
        }
        // Make a guess through the game engine
        if (gameEngine) {
            const result = gameEngine.makeGuess(guessValues);
            setLastResult(result);
            updateGameVersion();
            
            // Clear the guessValues state
            setGuessValues(new Array(characterCount).fill(''));
            
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