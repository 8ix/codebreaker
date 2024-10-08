import React, { useContext, useEffect, useState, ReactElement } from 'react';
import styled, {keyframes} from 'styled-components';
import { GameContext } from '../../context/GameContext';


const RoundComplete = () => {
    const { gameEngine, isLoading, gameVersion, updateGameVersion } = useContext(GameContext);

    useEffect(() => {
        if (gameEngine) {
            const game = gameEngine.getGameStatus();
            if(game.gameWon === true){
                gameEngine.newRound();
                updateGameVersion();
            } 
        }
    }, [gameEngine, gameVersion]);


    if (isLoading || !gameEngine) {
        return null;
    }

    return (
        <></>  
    );
}

export default RoundComplete;