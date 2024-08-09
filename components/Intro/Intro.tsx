import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import Container from "../UI/Container/Container";
import Logo from "../UI/Logo/Logo";
import Modal from "../UI//Modal/Modal";


const slideUp = keyframes`
    from {
        top: 0;
    }
    to {
        top: -100%;
    }
`;

const slideDown = keyframes`
    from {
        bottom: 0;
    }
    to {
        bottom: -100%;
    }
`;

const IntroContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;


const TopShutter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: #000;
    transition: top 2s;

    &.slide-up {
        animation: ${slideUp} 2s forwards;
    }

    p {
        font-size: 1.2rem;
        margin: 0 auto;
        max-width: 600px;
        padding: 20px;
        color: #fff;
        text-align: center;
    }
`;

const BottomShutter = styled.div`
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: #000;
    color: #fff;
    text-align: center;
    transition: bottom 2s;

    &.slide-down {
        animation: ${slideDown} 2s forwards;
    }

    p {
        font-size: 1rem;
        margin: 0 auto;
        max-width: 600px;
        padding: 30px 20px;
        font-weight: bold;
        color: #f0f868;
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

const Intro = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBeginClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimationComplete(true);
        }, 1000); // Adjust the delay to match your animation duration
    };

    const handleInstructionsClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <IntroContainer className={isAnimationComplete ? "no-pointer-events" : ""}>
            {!isAnimationComplete && (
                <>
                    <TopShutter className={isAnimating ? "slide-up" : ""}>
                        <Container>
                            <Logo />
                            <p><b>Your mission:</b> crack a series of passwords, Time is of the essence, and your skills as a master hacker are about to be put to the ultimate test.</p>
                        </Container>
                    </TopShutter>
                    <BottomShutter className={isAnimating ? "slide-down" : ""}>
                        <Container>
                            <p>Remember, a true Codebreaker thinks creatively and uses every clue.</p>
                            <Button onClick={handleBeginClick}>Begin</Button>
                            <Button onClick={handleInstructionsClick}>How to Play</Button>
                        </Container>
                    </BottomShutter>
                </>
            )}
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <h2>How to Play:</h2>
                <StyledList>     
                <ol>
                    <li>Your mission is to crack as many passwords as possible before running out of attempts.</li>
                    <li>For each new password, you have 5 attempts to guess correctly.</li>
                    <li>After each guess, you&aposll receive color-coded feedback:
                        <ul>
                            <li><b>Green:</b> Correct letter in the correct position.</li>
                            <li><b>Yellow:</b> Correct letter but in the wrong position.</li>
                            <li><b>Grey:</b> Letter not in the password.</li>
                        </ul>
                    </li>
                    <li>After each guess, you&aposll receive an additional clue to help you.</li>
                    <li>The game ends when you&aposve used all 5 attempts on a password.</li>
                </ol>
                </StyledList>
            </Modal>
        </IntroContainer>
    );
}
export default Intro;