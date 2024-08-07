import React, { useContext, useEffect, useState, ReactElement } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/GameContext';

import StatusLight from '../UI/StatusLight/StatusLight';

const GuessHistoryContainer = styled.div`
    witdh: 100%;
`;

const GuessItemBar = styled.ul`
    display: flex;
    list-style-type: none;
    padding: 0;
`;

const GuessItem = styled.li`
    display: flex;
    flex-direction: row;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 5px;
    background-color: #fff;
    color: #000;
    justify-content: center;

    &.lights {
        background-color: transparent;
        padding: 0;
        width: auto;
        height: auto;
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
                            <GuessItem className="lights">
                                <StatusLight type="perfect" count={guess.perfect} />
                                <StatusLight type="correct" count={guess.correct} />
                                <StatusLight type="incorrect" count={guess.incorrect} />
                            </GuessItem>
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
        <div>
            {guesses}
        </div>    
    );
}

export default GuessHistory;