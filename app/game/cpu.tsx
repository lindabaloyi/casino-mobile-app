import { GameBoard } from '@/components/game/GameBoard';
import { PlayerHand } from '@/components/game/PlayerHand';
import { Card } from '@/types/game';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function CpuGameScreen() {
  // Sample cards for the player hand
  const playerCards: Card[] = [
    { id: '1', suit: '♠', rank: 'A', value: 1 },
    { id: '2', suit: '♥', rank: '7', value: 7 },
    { id: '3', suit: '♦', rank: 'K', value: 13 },
    { id: '4', suit: '♣', rank: '5', value: 5 },
    { id: '5', suit: '♠', rank: 'Q', value: 12 },
    { id: '6', suit: '♥', rank: '2', value: 2 },
    { id: '7', suit: '♦', rank: '9', value: 9 },
    { id: '8', suit: '♣', rank: 'J', value: 11 },
    { id: '9', suit: '♠', rank: '10', value: 10 },
    { id: '10', suit: '♥', rank: '4', value: 4 },
  ];

  return (
    <View style={styles.container}>
      <GameBoard>
        {/* Player Hand - Bottom */}
        <PlayerHand
          cards={playerCards}
          playerName="You"
          isCurrentPlayer={true}
        />
      </GameBoard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});