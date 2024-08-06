import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import CodebreakerEngine from '../utils/CodebreakerEngine';
import { GameConfig } from '../utils/CodebreakerEngineTypes';

interface GameContextType {
    gameEngine: CodebreakerEngine | null;
    initGame: (config: GameConfig) => void;
    isLoading: boolean;
    gameVersion: number;
    updateGameVersion: () => void;
}

export const GameContext = createContext<GameContextType>({
    gameEngine: null,
    initGame: () => {},
    isLoading: true,
    gameVersion: 0,
    updateGameVersion: () => {},
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameEngine, setGameEngine] = useState<CodebreakerEngine | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [gameVersion, setGameVersion] = useState(0);
  
    const updateGameVersion = useCallback(() => {
      setGameVersion(v => v + 1);
    }, []);
  
    const initGame = useCallback((config: GameConfig) => {
      setIsLoading(true);
      const newGame = new CodebreakerEngine(config);
      setGameEngine(newGame);
      setIsLoading(false);
      updateGameVersion();
    }, [updateGameVersion]);
  
    return (
      <GameContext.Provider value={{ gameEngine, initGame, isLoading, gameVersion, updateGameVersion }}>
        {children}
      </GameContext.Provider>
    );
  };