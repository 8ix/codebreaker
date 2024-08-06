import React, { useContext, useEffect, useState, ReactElement } from 'react';
import { GameContext } from '../../context/GameContext';

const GuessHistory = () => {
    const { gameEngine, isLoading, gameVersion } = useContext(GameContext);
    const [guesses, setGuesses] = useState<ReactElement[]>([]);

    useEffect(() => {
        if (gameEngine) {
            const guessHistory = gameEngine.getGuessHistory();
            const guessesItems: ReactElement[] = [];

            guessHistory.forEach((guess, index) => {
                guessesItems.push(
                    <div key={index}>
                        <div>Guess: {guess.guess.join('')}</div>
                        <div>Perfect Matches: {guess.perfect}</div>
                        <div>Correct Items: {guess.correct}</div>
                        <div>Incorrect Items: {guess.incorrect}</div>
                    </div>
                );
            });

            setGuesses(guessesItems);
        }
    }, [gameEngine, gameVersion]);


    if (isLoading || !gameEngine) {
        return null;
    }

    return (
        <div>
            {guesses}
        </div>    
    );
}

export default GuessHistory;