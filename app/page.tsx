"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import { GameProvider, GameContext } from '../context/GameContext';

// Components
import Clues from '../components/Clues/Clues';
import PasswordEntryBoxes from '../components/PasswordEntryBoxes/PasswordEntryBoxes';
import GuessHistory from '../components/GuessHistory/GuessHistory';

//password list
import Passwords from '../content/passwords.json';

type Password = {
  password: string;
  passwordHint: string;
  passwordClue1: string;
  passwordClue2: string;
  passwordClue3: string;
}

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
  const passwordRef = useRef<Password | null>(null);

  useEffect(() => {
    if (!gameEngine) {

      if (!passwordRef.current) {
        const randomPassword = Passwords[Math.floor(Math.random() * Passwords.length)];
        passwordRef.current = randomPassword;
      }

      const defaultConfig = {
        items: [],
        secretCode: passwordRef.current.password.split(''),
        rounds: 8,
        lives: 1,
        debug: false,
        clues: {
          passwordHint: passwordRef.current.passwordHint,
          passwordClue1: passwordRef.current.passwordClue1,
          passwordClue2: passwordRef.current.passwordClue2,
          passwordClue3: passwordRef.current.passwordClue3
        }
      };
      initGame(defaultConfig);
      setIsInitialized(true);
    }
  }, [initGame, gameEngine, isInitialized]);

  if (isLoading) return <div>Loading game...</div>;

  return (
    <>
      <h1>Codebreaker Game</h1>
      <Clues />
      <PasswordEntryBoxes />
      <GuessHistory />
    </>
  );
}