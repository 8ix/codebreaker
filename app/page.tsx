"use client"

import React, { useContext } from 'react';
import { GameProvider, GameContext } from '../context/GameContext';
import PasswordEntryBoxes from '../components/PasswordEntryBoxes/PasswordEntryBoxes';

function GameComponent() {
  const { isLoading } = useContext(GameContext);

  if (isLoading) return <div>Loading game...</div>;

  return (
    <div>
      <h1>Codebreaker Game</h1>
      <PasswordEntryBoxes />
    </div>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameComponent />
    </GameProvider>
  );
}