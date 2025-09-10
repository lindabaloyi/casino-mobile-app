import { useCallback, useReducer } from 'react';

// Game state types
export interface Card {
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  value: number;
  id: string;
}

export interface Build {
  id: string;
  type: 'build';
  cards: Card[];
  value: number;
  owner: 0 | 1;
}

export interface GameState {
  deck: Card[];
  playerHands: Card[][];
  tableCards: (Card | Build)[];
  playerCaptures: Card[][][];
  currentPlayer: 0 | 1;
  round: 1 | 2;
  scores: number[];
  gameOver: boolean;
  winner: 0 | 1 | null;
  gameMode: 'cpu' | 'local' | 'online';
  stagingStack: Card[];
  selectedCards: string[];
}

// Action types
type GameAction =
  | { type: 'INITIALIZE_GAME'; payload: { mode: 'cpu' | 'local' | 'online' } }
  | { type: 'START_NEXT_ROUND' }
  | { type: 'PLAY_CARD'; payload: { playerIndex: 0 | 1; cardId: string } }
  | { type: 'CAPTURE_CARDS'; payload: { playerIndex: 0 | 1; cardIds: string[] } }
  | { type: 'CREATE_BUILD'; payload: { playerIndex: 0 | 1; cardIds: string[]; value: number } }
  | { type: 'ADD_TO_STAGING'; payload: { cardId: string } }
  | { type: 'CLEAR_STAGING' }
  | { type: 'CONFIRM_STAGING' }
  | { type: 'CANCEL_STAGING' }
  | { type: 'END_GAME'; payload: { winner: 0 | 1 | null } };

// Initial state
const initialState: GameState = {
  deck: [],
  playerHands: [[], []],
  tableCards: [],
  playerCaptures: [[], []],
  currentPlayer: 0,
  round: 1,
  scores: [0, 0],
  gameOver: false,
  winner: null,
  gameMode: 'cpu',
  stagingStack: [],
  selectedCards: [],
};

// Game reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...initialState,
        gameMode: action.payload.mode,
        // TODO: Initialize deck and deal cards
      };

    case 'START_NEXT_ROUND':
      return {
        ...state,
        round: state.round === 1 ? 2 : 1,
        currentPlayer: 0,
        stagingStack: [],
        selectedCards: [],
        // TODO: Reset hands and table for new round
      };

    case 'ADD_TO_STAGING':
      const cardToAdd = findCardById(state, action.payload.cardId);
      if (!cardToAdd) return state;

      return {
        ...state,
        stagingStack: [...state.stagingStack, cardToAdd],
        selectedCards: [...state.selectedCards, action.payload.cardId],
      };

    case 'CLEAR_STAGING':
      return {
        ...state,
        stagingStack: [],
        selectedCards: [],
      };

    case 'CONFIRM_STAGING':
      // TODO: Implement staging confirmation logic
      return {
        ...state,
        stagingStack: [],
        selectedCards: [],
      };

    case 'CANCEL_STAGING':
      return {
        ...state,
        stagingStack: [],
        selectedCards: [],
      };

    default:
      return state;
  }
}

// Helper function to find card by ID
function findCardById(state: GameState, cardId: string): Card | null {
  // Search in player hands
  for (const hand of state.playerHands) {
    const card = hand.find(c => c.id === cardId);
    if (card) return card;
  }

  // Search in table cards
  for (const tableCard of state.tableCards) {
    if ('id' in tableCard && tableCard.id === cardId) {
      return tableCard as Card;
    }
    if ('cards' in tableCard) {
      const card = tableCard.cards.find(c => c.id === cardId);
      if (card) return card;
    }
  }

  return null;
}

// Custom hook
export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const initializeGame = useCallback((mode: 'cpu' | 'local' | 'online') => {
    dispatch({ type: 'INITIALIZE_GAME', payload: { mode } });
  }, []);

  const startNextRound = useCallback(() => {
    dispatch({ type: 'START_NEXT_ROUND' });
  }, []);

  const addToStaging = useCallback((cardId: string) => {
    dispatch({ type: 'ADD_TO_STAGING', payload: { cardId } });
  }, []);

  const clearStaging = useCallback(() => {
    dispatch({ type: 'CLEAR_STAGING' });
  }, []);

  const confirmStaging = useCallback(() => {
    dispatch({ type: 'CONFIRM_STAGING' });
  }, []);

  const cancelStaging = useCallback(() => {
    dispatch({ type: 'CANCEL_STAGING' });
  }, []);

  return {
    state,
    actions: {
      initializeGame,
      startNextRound,
      addToStaging,
      clearStaging,
      confirmStaging,
      cancelStaging,
    },
  };
}