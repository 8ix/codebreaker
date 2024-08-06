"use client"

import React, { useContext, useEffect } from 'react';
import { GameProvider, GameContext } from '../context/GameContext';

// Components
import PasswordEntryBoxes from '../components/PasswordEntryBoxes/PasswordEntryBoxes';
import GuessHistory from '../components/GuessHistory/GuessHistory';

export default function Home() {
  return (
    <GameProvider>
      <GameComponent />
    </GameProvider>
  );
}

function GameComponent() {
  const { isLoading, initGame, gameEngine } = useContext(GameContext);

  useEffect(() => {
    if (!gameEngine) {
      const defaultConfig = {
        items: ['1', '2', '3', '4', '5', '6'],
        secretCode: [],
        rounds: 10,
        lives: 3,
        debug: false
      };
      initGame(defaultConfig);
    }
  }, [initGame, gameEngine]);

  if (isLoading) return <div>Loading game...</div>;

  return (
    <>
      <h1>Codebreaker Game</h1>
      <PasswordEntryBoxes />
      <GuessHistory />
    </>
  );
}