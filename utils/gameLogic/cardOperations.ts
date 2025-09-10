/**
 * Card operation utilities for the Casino Card Game
 */

import { GAME_RULES } from '@/constants/GameRules';
import { Card } from '@/types/game';

/**
 * Create a standard deck of 52 cards
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];

  GAME_RULES.SUITS.forEach(suit => {
    GAME_RULES.RANKS.forEach(rank => {
      const card: Card = {
        id: `${suit}-${rank}`,
        suit,
        rank,
        value: GAME_RULES.CARD_VALUES[rank as keyof typeof GAME_RULES.CARD_VALUES],
      };
      deck.push(card);
    });
  });

  return deck;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleDeck<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deal cards to players
 */
export function dealCards(deck: Card[], numPlayers: number, cardsPerPlayer: number): {
  playerHands: Card[][];
  remainingDeck: Card[];
} {
  const playerHands: Card[][] = Array.from({ length: numPlayers }, () => []);
  let currentDeck = [...deck];

  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let player = 0; player < numPlayers; player++) {
      if (currentDeck.length > 0) {
        const card = currentDeck.pop()!;
        playerHands[player].push(card);
      }
    }
  }

  return {
    playerHands,
    remainingDeck: currentDeck,
  };
}

/**
 * Find a card by its ID in various collections
 */
export function findCardById(cardId: string, collections: Card[][]): Card | null {
  for (const collection of collections) {
    const card = collection.find(c => c.id === cardId);
    if (card) return card;
  }
  return null;
}

/**
 * Check if a card is a special casino card
 */
export function isSpecialCard(card: Card): boolean {
  const { BIG_CASINO, LITTLE_CASINO } = GAME_RULES.SPECIAL_CARDS;
  return (
    (card.suit === BIG_CASINO.suit && card.rank === BIG_CASINO.rank) ||
    (card.suit === LITTLE_CASINO.suit && card.rank === LITTLE_CASINO.rank)
  );
}

/**
 * Get the point value of special cards
 */
export function getSpecialCardPoints(card: Card): number {
  const { BIG_CASINO, LITTLE_CASINO } = GAME_RULES.SPECIAL_CARDS;

  if (card.suit === BIG_CASINO.suit && card.rank === BIG_CASINO.rank) {
    return GAME_RULES.SCORING.BIG_CASINO;
  }

  if (card.suit === LITTLE_CASINO.suit && card.rank === LITTLE_CASINO.rank) {
    return GAME_RULES.SCORING.LITTLE_CASINO;
  }

  if (card.rank === 'A') {
    return GAME_RULES.SCORING.ACES;
  }

  return 0;
}