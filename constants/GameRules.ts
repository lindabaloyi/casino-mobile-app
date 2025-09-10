/**
 * Game rules and constants for the Casino Card Game
 */

export const GAME_RULES = {
  // Card values
  CARD_VALUES: {
    'A': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q': 10,
    'K': 10,
  },

  // Scoring rules
  SCORING: {
    MOST_CARDS: 2,
    MOST_SPADES: 2,
    BIG_CASINO: 2, // 10 of Diamonds
    LITTLE_CASINO: 1, // 2 of Spades
    ACES: 1, // Per ace
  },

  // Special cards
  SPECIAL_CARDS: {
    BIG_CASINO: { suit: '♦', rank: '10' },
    LITTLE_CASINO: { suit: '♠', rank: '2' },
  },

  // Game configuration
  INITIAL_CARDS_PER_PLAYER: 4,
  MAX_BUILD_CARDS: 5,
  TOTAL_ROUNDS: 2,

  // Suits
  SUITS: ['♠', '♥', '♦', '♣'] as const,

  // Ranks
  RANKS: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const,
} as const;

export const GAME_MODES = {
  CPU: 'cpu',
  LOCAL: 'local',
  ONLINE: 'online',
} as const;

export type GameMode = typeof GAME_MODES[keyof typeof GAME_MODES];

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[keyof typeof DIFFICULTY_LEVELS];