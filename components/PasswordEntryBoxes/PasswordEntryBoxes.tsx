import React, { useContext, useState, useEffect, ReactElement } from 'react';
import { GameContext } from '../../context/GameContext';

const PasswordEntryBoxes = () => {
    const { gameEngine, isLoading } = useContext(GameContext);
    const [guessCount, setGuessCount] = useState<number>(0);
    const [characterBoxes, setCharacterBoxes] = useState<ReactElement[]>([]);

    useEffect(() => {
        if (gameEngine && !isLoading) {
            setGuessCount(gameEngine.secretCode.length);
        }
    }, [gameEngine, isLoading]);

    useEffect(() => {
        const newCharacterBoxes: ReactElement[] = [];
        for(let i = 0; i < guessCount; i++) {
            newCharacterBoxes.push(<input type="text" key={i} maxLength={1} style={{ width: '30px', marginRight: '5px' }} />);
        }
        setCharacterBoxes(newCharacterBoxes);
    }, [guessCount]);

    if (isLoading || !gameEngine) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {characterBoxes}
            <input type="submit" value="Submit" />
        </div>
    );
}

export default PasswordEntryBoxes;