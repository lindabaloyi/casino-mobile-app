/**
 * TypeScript type definitions for the Casino Card Game
 */

export interface Card {
  id: string;
  suit: '♠' | '♥' | '♦' | '♣';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  value: number;
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

export interface Player {
  id: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface GameRoom {
  id: string;
  host: Player;
  players: Player[];
  status: 'waiting' | 'in-progress' | 'finished';
  gameMode: 'cpu' | 'local' | 'online';
  createdAt: Date;
  settings: GameSettings;
}

export interface GameSettings {
  difficulty?: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  isPrivate: boolean;
  maxPlayers: number;
}

export interface GameInvite {
  id: string;
  from: Player;
  to: Player;
  gameType: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  expiresAt: Date;
}

export interface Move {
  type: 'trail' | 'capture' | 'build' | 'steal';
  player: 0 | 1;
  cards: Card[];
  timestamp: Date;
  valid: boolean;
}

export interface GameStatistics {
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  totalScore: number;
  bestStreak: number;
  averageGameTime: number;
  favoriteCard?: Card;
}

// Action types for game state management
export type GameAction =
  | { type: 'INITIALIZE_GAME'; payload: { mode: 'cpu' | 'local' | 'online'; settings?: GameSettings } }
  | { type: 'START_NEXT_ROUND' }
  | { type: 'PLAY_CARD'; payload: { playerIndex: 0 | 1; cardId: string } }
  | { type: 'CAPTURE_CARDS'; payload: { playerIndex: 0 | 1; cardIds: string[] } }
  | { type: 'CREATE_BUILD'; payload: { playerIndex: 0 | 1; cardIds: string[]; value: number } }
  | { type: 'ADD_TO_STAGING'; payload: { cardId: string } }
  | { type: 'CLEAR_STAGING' }
  | { type: 'CONFIRM_STAGING' }
  | { type: 'CANCEL_STAGING' }
  | { type: 'END_GAME'; payload: { winner: 0 | 1 | null } }
  | { type: 'UPDATE_SCORES'; payload: { scores: number[] } };

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Re-export types from constants
export type { DifficultyLevel, GameMode } from '@/constants/GameRules';
