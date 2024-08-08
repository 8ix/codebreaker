import React, { useContext, useEffect, useState, ReactElement } from 'react';
import styled, {keyframes} from 'styled-components';
import { GameContext } from '../../context/GameContext';

const GameOverContainer = styled.div`
    display:block;
    position: absolute;
    top:0;
    left:0;
    background-color: black;
    color:white;
    font-size: 7rem;
    width:100%;
    height:100%;
    z-index: 200;
    text-align: center;
`;

const Outro = () => {
    const { gameEngine, isLoading, gameVersion, updateGameVersion } = useContext(GameContext);
    const [gameOver, setGameOver] = useState<ReactElement[]>([]);

    useEffect(() => {
        if (gameEngine) {
            const game = gameEngine.getGameStatus();
            let Outro = [];
            if(game.gameOver === true){
                Outro.push(<GameOverContainer key="game-over">Game Over</GameOverContainer>);
                setGameOver(Outro);
            } 
        }
    }, [gameEngine, gameVersion]);


    if (isLoading || !gameEngine) {
        return null;
    }

    return (
        <>
            {gameOver}
        </>  
    );
}

export default Outro;