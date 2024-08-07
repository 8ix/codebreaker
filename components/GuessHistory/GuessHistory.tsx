import React, { useContext, useEffect, useState, ReactElement } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/GameContext';

import StatusLight from '../UI/StatusLight/StatusLight';

const GuessHistoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const GuessHistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
`;

const GuessItemBar = styled.ul`
    display: flex;
    list-style-type: none;
    padding: 0;
    flex-direction: row;
    justify-content: center;
`;

const LightWrapper = styled.div`
    display: flex;
    

    &.lights{
        flex-direction: row;
        justify-content: center;
    }
`;

const GuessItem = styled.li`
    text-align: center; 
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 5px;
    background-color: #fff;
    color: #000;
    justify-content: center;
    border: 2px solid #000;
    border-radius: 50%;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.1em;

    &.red{
        background-color: #d4d4d4;
        opacity: 0.3;
    }
    &.yellow{
        background-color: #f0f868;
    }
    &.green{
        background-color: #4b8f4b;
        color: #fff;
    }
`;

const GuessHistory = () => {
    const { gameEngine, isLoading, gameVersion } = useContext(GameContext);
    const [guesses, setGuesses] = useState<ReactElement[]>([]);
    let keycount = 0;

    useEffect(() => {
        if (gameEngine) {
            const guessHistory = gameEngine.getGuessHistory();
            const guessesItems: ReactElement[] = [];


            guessHistory.forEach((guess, index) => {

                let guessItems: ReactElement[] = [];
                let wordPosition = 0;

                guess.guess.forEach(element => {
                    guessItems.push(
                        <GuessItem key={element+keycount} className={String(guess.positions[wordPosition])}>{element}</GuessItem>
                    );
                    keycount++;
                    wordPosition++;
                });

                guessesItems.push(
                    <GuessHistoryContainer key={index}>
                        <GuessItemBar>
                            {guessItems}
                        </GuessItemBar>
                    </GuessHistoryContainer>
                );
            });

            setGuesses(guessesItems);
        }
    }, [gameEngine, gameVersion]);


    if (isLoading || !gameEngine) {
        return null;
    }

    return (
        <GuessHistoryWrapper>
            {guesses}
        </GuessHistoryWrapper>    
    );
}

export default GuessHistory;