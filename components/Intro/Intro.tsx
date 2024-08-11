import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { GameContext } from '../../context/GameContext';

import Container from "../UI/Container/Container";
import Logo from "../UI/Logo/Logo";
import Modal from "../UI//Modal/Modal";

const slideUp = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100%);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
`;

const IntroContainer = styled.div.attrs<{ isHidden: boolean }>(props => ({
  style: {
    pointerEvents: props.isHidden ? 'none' : 'auto',
    opacity: props.isHidden ? 0 : 1,
  },
}))`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 1000;
    transition: opacity 0.5s ease-in-out;
`;

const Shutter = styled.div`
    position: absolute;
    width: 100%;
    height: 50%;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    transition: transform 1s ease-in-out;

    &.top {
        top: 0;
    }

    &.bottom {
        bottom: 0;
    }

    &.slide-up {
        animation: ${slideUp} 1s forwards;
    }

    &.slide-down {
        animation: ${slideDown} 1s forwards;
    }

    p {
        font-size: 1.2rem;
        margin: 0 auto;
        max-width: 600px;
        padding: 20px;
        color: #fff;
        text-align: center;
    }
    .codebreaker{
        font-size: 1rem;
        margin: 0 auto;
        max-width: 600px;
        padding: 30px 20px;
        font-weight: bold;
        color: #f0f868;
    }
    &.bottomshutter{
       justify-content: flex-start;
       text-align:center;
    }
`;

const Button = styled.button`
    background-color: #fff;
    border: none;
    color: #000;
    font-weight: bold;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.5s, color 0.5s;

    &:hover {
        background-color: #f0f868;
        color: #000;
    }
`;

const StyledList = styled.ul`
    text-align: left;
    padding: 20px;
    font-size: 0.9rem;

    li {
        margin-bottom: 15px;
    }
    ul,ol {
        padding-left: 20px;
        margin: 10px;
    }
    span {
        display: block;
        margin-top: 10px;
        font-style: italic;
    }
`;

const Intro: React.FC = () => {
    const { gameEngine, isLoading, gameVersion, updateGameVersion } = useContext(GameContext);

    const [isAnimating, setIsAnimating] = useState(false);
    const [isIntroHidden, setIsIntroHidden] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameScore, setGameScore] = useState(0);

    const handleBeginClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsIntroHidden(true);
        }, 1000);
    };

    const handleNewGameClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsGameOver(false);
            setIsIntroHidden(true);
        }, 1000);
    };

    const handleInstructionsClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (gameEngine) {
            const game = gameEngine.getGameStatus();

            if (game.gameOver && !isGameOver) {
                setIsGameOver(true);
                setIsIntroHidden(false);
                setIsAnimating(false);
                setGameScore(game.currentStage);
                gameEngine.newGame();
                updateGameVersion();
            }
        }
    }, [gameEngine, gameVersion, isGameOver]);

    return (
        <IntroContainer isHidden={isIntroHidden}>
            <Shutter className={`top ${isAnimating ? 'slide-up' : ''}`}>
                <Container>
                    <Logo />
                    {isGameOver ? (
                        <p><b>Game Over!</b> Your final score: {gameScore}</p>
                    ) : (
                        <p><b>Your mission:</b> crack a series of passwords. Time is of the essence, and your skills as a master hacker are about to be put to the ultimate test.</p>
                    )}
                </Container>
            </Shutter>
            <Shutter className={`bottom bottomshutter ${isAnimating ? 'slide-down' : ''}`}>
                <Container>
                    {isGameOver ? (
                        <>
                            <p className={'codebreaker'}>Want to test your skills again?</p>
                            <Button onClick={handleNewGameClick}>New Game</Button>
                        </>
                    ) : (
                        <>
                            <p className={'codebreaker'}>Remember, a true Codebreaker thinks creatively and uses every clue.</p>
                            <Button onClick={handleBeginClick}>Begin</Button>
                            <Button onClick={handleInstructionsClick}>How to Play</Button>
                        </>
                    )}
                </Container>
            </Shutter>
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <h2>How to Play:</h2>
                <StyledList>     
                <ol>
                    <li>Your mission is to crack as many passwords as possible before running out of attempts.</li>
                    <li>For each new password, you have 5 attempts to guess correctly.</li>
                    <li>After each guess, you'll receive colour-coded feedback:
                        <ul>
                            <li><b>Green:</b> Correct letter in the correct position.</li>
                            <li><b>Yellow:</b> Correct letter but in the wrong position.</li>
                            <li><b>Grey:</b> Letter not in the password.</li>
                        </ul>
                    </li>
                    <li>After each guess, you'll receive an additional clue to help you.</li>
                    <li>The game ends when you've used all 5 attempts on a password.</li>
                </ol>
                </StyledList>
            </Modal>
        </IntroContainer>
    );
}

export default Intro;