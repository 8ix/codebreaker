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
    background-color: #000;
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
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: 5px;
    background-color: #fff;
    color: #000;
    justify-content: center;
    border: 1px solid #000;
    border-radius: 50%;
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

                guess.guess.forEach(element => {
                    guessItems.push(
                        <GuessItem key={element+keycount}>{element}</GuessItem>
                    );
                    keycount++;
                });

                guessesItems.push(
                    <GuessHistoryContainer key={index}>
                        <GuessItemBar>
                            {guessItems}
                        </GuessItemBar>
                        <LightWrapper>
                            <StatusLight type="perfect" count={guess.perfect} />
                            <StatusLight type="correct" count={guess.correct} />
                            <StatusLight type="incorrect" count={guess.incorrect} />
                        </LightWrapper>
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