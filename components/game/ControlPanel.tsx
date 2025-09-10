import { Button } from '@/components/ui/Button';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ControlPanelProps {
  currentPlayer: 0 | 1;
  gamePhase: 'playing' | 'staging' | 'waiting';
  canConfirm: boolean;
  canCancel: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onEndTurn: () => void;
  onNewGame: () => void;
  playerNames: string[];
}

export function ControlPanel({
  currentPlayer,
  gamePhase,
  canConfirm,
  canCancel,
  onConfirm,
  onCancel,
  onEndTurn,
  onNewGame,
  playerNames,
}: ControlPanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.currentPlayerText}>
          {playerNames[currentPlayer]}'s Turn
        </Text>
        <View style={[styles.phaseIndicator, styles[gamePhase]]}>
          <Text style={styles.phaseText}>
            {gamePhase === 'playing' && 'Playing'}
            {gamePhase === 'staging' && 'Staging Cards'}
            {gamePhase === 'waiting' && 'Waiting'}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        {gamePhase === 'staging' && (
          <>
            <Button
              title="Confirm"
              onPress={onConfirm}
              disabled={!canConfirm}
              variant="primary"
              size="medium"
            />
            <Button
              title="Cancel"
              onPress={onCancel}
              disabled={!canCancel}
              variant="secondary"
              size="medium"
            />
          </>
        )}

        {gamePhase === 'playing' && (
          <>
            <Button
              title="End Turn"
              onPress={onEndTurn}
              variant="primary"
              size="medium"
            />
            <Button
              title="New Game"
              onPress={onNewGame}
              variant="danger"
              size="small"
            />
          </>
        )}

        {gamePhase === 'waiting' && (
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>Waiting for opponent...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentPlayerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  phaseIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  playing: {
    backgroundColor: '#28a745',
  },
  staging: {
    backgroundColor: '#ffc107',
  },
  waiting: {
    backgroundColor: '#6c757d',
  },
  phaseText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  waitingContainer: {
    alignItems: 'center',
    padding: 16,
  },
  waitingText: {
    color: '#ccc',
    fontSize: 16,
    fontStyle: 'italic',
  },
});