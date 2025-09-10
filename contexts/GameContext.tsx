import { useGameState } from '@/hooks/useGameState';
import React, { createContext, ReactNode, useContext } from 'react';

interface GameContextType {
  gameState: ReturnType<typeof useGameState>['state'];
  gameActions: ReturnType<typeof useGameState>['actions'];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const { state, actions } = useGameState();

  const value: GameContextType = {
    gameState: state,
    gameActions: actions,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}