import React, { useContext, useState, useEffect, ReactElement, useRef, useCallback } from 'react';
import { GameContext } from '../../context/GameContext';
import { GameStatus } from '../../utils/CodebreakerEngineTypes';
import Modal from '../UI/Modal/Modal';

import styled from 'styled-components';

type BoxWrapperProps = {
    boxCount: number;
}

const BoxWrapper = styled.div<BoxWrapperProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 20px;
    margin-bottom:20px;
    max-width: 800px;

    input {
        flex: 1;
        width: calc(100% / ${props => props.boxCount});
        height: calc(100% / ${props => props.boxCount});
        text-align: center;
        font-size: 1.8rem;
        margin: 0 5px;
        aspect-ratio: 1/1; // Add this line to maintain square aspect ratio
        text-transform: uppercase;
    }
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 1.5rem;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #333;
    }
`;

const PasswordEntryBoxes = () => {
    const { gameEngine, isLoading, updateGameVersion } = useContext(GameContext);
    const [characterCount, setCharacterCount] = useState<number>(0);
    const [guessValues, setGuessValues] = useState<string[]>([]);
    const [lastResult, setLastResult] = useState<GameStatus | null>(null);
    const [characterBoxes, setCharacterBoxes] = useState<ReactElement[]>([]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');

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

    const showErrorModal = (message: string) => {
        setModalMessage(message);
        setIsModalVisible(true);
    };

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
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }, [characterCount, guessValues]);

    // Create the character boxes
    useEffect(() => {
        const newCharacterBoxes: ReactElement[] = [];
        for(let i = 0; i < characterCount; i++) {
            newCharacterBoxes.push(
                <input 
                    type="text" 
                    key={i+'password-entry-box'}
                    ref={(el) => setInputRef(el, i)}
                    maxLength={1} 
                    value={guessValues[i] || ''}
                    onChange={(e) => handleInputChange(i, e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(i, e)}
                />
            );
        }
        setCharacterBoxes(newCharacterBoxes);
    }, [characterCount, guessValues, setInputRef]);

    
    const handleSubmit = () => {
        if (guessValues.some(value => value === '')) {
            showErrorModal("Please fill in all character boxes before submitting.");
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
        <BoxWrapper boxCount={characterCount}>
            {characterBoxes}
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            {isModalVisible && <Modal show={isModalVisible} onClose={() => setIsModalVisible(false)}>{modalMessage}</Modal>}
        </BoxWrapper>
    );
}

export default PasswordEntryBoxes;