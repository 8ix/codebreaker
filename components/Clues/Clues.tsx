import React, { useContext, useEffect, useState, ReactElement } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/GameContext';

const Clues = () => {
    const { gameEngine, isLoading, gameVersion } = useContext(GameContext);
    const [clues, setClues] = useState<ReactElement[]>([]);


    useEffect(() => {
        if (gameEngine) {

            const game = gameEngine.getGameStatus();
            let hints = [];

            if(game.clues !== null && game.clues.passwordHint){
                hints.push(
                    <div key={game.clues.passwordHint}>
                        <p>
                            <b>Password Hint:</b> {game.clues.passwordHint}
                        </p>
                    </div>
                );
            }

            if(game.roundsLeft <= 6){
                game.clues !== null && hints.push(
                    <div key={game.clues.passwordClue1}>
                        <p>
                            <b>Clue 1:</b> {game.clues.passwordClue1}
                        </p>
                    </div>
                );
            }

            if(game.roundsLeft <= 4){
                game.clues !== null && hints.push(
                    <div key={game.clues.passwordClue2}>
                        <p>
                            <b>Clue 2:</b> {game.clues.passwordClue2}
                        </p>
                    </div>
                );
            }

            if(game.roundsLeft <= 2){
                game.clues !== null && hints.push(
                    <div key={game.clues.passwordClue3}>
                        <p>
                            <b>Clue 3:</b> {game.clues.passwordClue3}
                        </p>
                    </div>
                );
            }

            setClues(hints);
        }
    }, [gameEngine, gameVersion]);


    if (isLoading || !gameEngine) {
        return null;
    }

    return (
        <div>
           {clues}
        </div>    
    );
}

export default Clues;