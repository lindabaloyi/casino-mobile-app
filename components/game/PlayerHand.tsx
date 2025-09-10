import { Card as CardType } from '@/types/game';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../ui/Card';

interface PlayerHandProps {
  cards: CardType[];
  isCurrentPlayer: boolean;
  playerName: string;
}

export function PlayerHand({ cards, isCurrentPlayer, playerName }: PlayerHandProps) {
  const handContainerStyle = isCurrentPlayer
    ? [styles.container, styles.activePlayer]
    : styles.container;

  const middleIndex = (cards.length - 1) / 2;

  return (
    <View style={handContainerStyle}>
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          // Computer card game style fanning - even spacing, gentle curve
          const totalCards = cards.length;
          const maxRotation = 20; // Total fan angle in degrees (gentle spread)
          const rotationStep = totalCards > 1 ? maxRotation / (totalCards - 1) : 0;
          const rotation = -maxRotation / 2 + (rotationStep * index); // Center the fan

          // Even spacing with gentle curve
          const baseSpacing = -15; // Base spacing between cards
          const translateX = (index - middleIndex) * baseSpacing;
          const curveOffset = Math.sin((index / (totalCards - 1 || 1)) * Math.PI) * 5; // Gentle curve
          const translateY = -Math.abs(curveOffset); // Cards follow curve downward

          return (
            <View
              key={card.id}
              style={[
                styles.cardWrapper,
                {
                  marginLeft: index > 0 ? -20 : 0, // Minimal overlap for computer game style
                  transform: [
                    { translateX: translateX },
                    { translateY: translateY },
                    { rotate: `${rotation}deg` }
                  ],
                },
              ]}
            >
              <Card {...card} />
            </View>
          );
        })}
      </View>
      {isCurrentPlayer && <View style={styles.turnIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  activePlayer: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10, // Space for the turn indicator below
  },
  cardWrapper: {
    marginHorizontal: -10,
  },
  turnIndicator: {
    height: 4,
    width: '40%',
    backgroundColor: '#ffc107', // A gold/yellow color for highlight
    borderRadius: 2,
    marginTop: 8,
  },
});