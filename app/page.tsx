"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import { GameProvider, GameContext } from '../context/GameContext';

// Components
import Clues from '../components/Clues/Clues';
import PasswordEntryBoxes from '../components/PasswordEntryBoxes/PasswordEntryBoxes';
import GuessHistory from '../components/GuessHistory/GuessHistory';
import Intro from '../components/Intro/Intro';
import Container from '../components/UI/Container/Container';
import Logo from '../components/UI/Logo/Logo';

//password list
import Passwords from '../content/passwords.json';


export default function Home() {
  return (
    <GameProvider>
      <GameComponent />
    </GameProvider>
  );
}

function GameComponent() {
  const { isLoading, initGame, gameEngine } = useContext(GameContext);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!gameEngine) {

      const defaultConfig = {
        rounds: 5,
        lives: 1,
        debug: false,
        passwordCollection: Passwords
      };
      initGame(defaultConfig);
      setIsInitialized(true);
    }
  }, [initGame, gameEngine, isInitialized]);

  if (isLoading) return <div>Loading game...</div>;

  //  <Intro />

  return (
      <>
        <Intro />
        <Container paddingTop={60}>
          <Logo inverted={true} />
          <PasswordEntryBoxes />
          <Clues />
          <GuessHistory />
        </Container>
      </>
  );
}