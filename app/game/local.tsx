import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LocalGameScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Multiplayer</Text>
      <Text style={styles.subtitle}>Pass-and-play with another player</Text>
      {/* This will be replaced with the actual GameBoard component */}
      <View style={styles.gameArea}>
        <Text style={styles.placeholder}>Game Board Component</Text>
        <Text style={styles.placeholder}>Will be implemented in Phase 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d5a27',
    margin: 20,
    borderRadius: 10,
  },
  placeholder: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});