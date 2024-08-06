import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import CodebreakerEngine from '../utils/CodebreakerEngine';
import { GameConfig } from '../utils/CodebreakerEngineTypes';

interface GameContextType {
  gameEngine: CodebreakerEngine | null;
  initGame: (config: GameConfig) => void;
  isLoading: boolean;
}

export const GameContext = createContext<GameContextType>({ 
    gameEngine: null,
    initGame: () => {},
    isLoading: true
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameEngine, setGameEngine] = useState<CodebreakerEngine | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    const initGame = useCallback((config: GameConfig) => {
      setIsLoading(true);
      const newGame = new CodebreakerEngine(config);
      setGameEngine(newGame);
      setIsLoading(false);
    }, []);

    useEffect(() => {
      // Initialize game with default config
      const defaultConfig: GameConfig = {
        items: ['1', '2', '3', '4', '5', '6'],
        secretCode: [],
        rounds: 10,
        lives: 3,
        debug: false
      };
      initGame(defaultConfig);
    }, [initGame]);
  
    return (
      <GameContext.Provider value={{ gameEngine, initGame, isLoading }}>
        {children}
      </GameContext.Provider>
    );
};