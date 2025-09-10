import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface GameBoardProps {
  children?: React.ReactNode;
}

export function GameBoard({ children }: GameBoardProps) {
  return (
    <View style={styles.container}>
      {/* Rich Wooden Table Background */}
      <LinearGradient
        colors={['#6a3a25', '#4a2a1a']}
        style={styles.tableBackground}
      >
        {/* Wood Grain Texture */}
        <View style={styles.woodGrain} />

        {/* Green Felt Playing Surface */}
        <View style={styles.feltSurface}>
          <LinearGradient
            colors={['#006400', '#004d00']}
            style={styles.feltGradient}
          >
            {/* Subtle Felt Texture */}
            <View style={styles.feltTexture} />

            {/* Game Content Area */}
            <View style={styles.gameArea}>
              {children}
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d1810', // Fallback color
  },
  tableBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  woodGrain: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.1,
  },
  feltSurface: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 8,
    borderColor: '#4a2a1a',
  },
  feltGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feltTexture: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    opacity: 0.2,
  },
  gameArea: {
    flex: 1,
    width: '100%',
    padding: 20,
    position: 'relative',
  },
});
