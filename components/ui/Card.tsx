import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CardProps {
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  value: number;
  faceUp?: boolean;
  draggable?: boolean;
  onPress?: () => void;
  onDragStart?: () => void;
  onDragEnd?: (x: number, y: number) => void;
  style?: any;
}

export function Card({
  suit,
  rank,
  value,
  faceUp = true,
  draggable = false,
  onPress,
  onDragStart,
  onDragEnd,
  style,
}: CardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const panGesture = Gesture.Pan()
    .enabled(draggable)
    .onStart(() => {
      scale.value = withSpring(1.1);
      onDragStart?.();
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      scale.value = withSpring(1);
      onDragEnd?.(event.translationX, event.translationY);
      // Reset position (in real implementation, this would be handled by drop zones)
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const tapGesture = Gesture.Tap()
    .enabled(!draggable)
    .onStart(() => {
      onPress?.();
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const getSuitColor = (suit: string) => {
    return suit === '♥' || suit === '♦' ? '#dc3545' : '#000';
  };

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.card, animatedStyle, style]}>
        {faceUp ? (
          <View style={styles.cardContent}>
            <View style={styles.topLeft}>
              <Text style={[styles.rank, { color: getSuitColor(suit) }]}>{rank}</Text>
              <Text style={[styles.suit, { color: getSuitColor(suit) }]}>{suit}</Text>
            </View>
            <View style={styles.center}>
              <Text style={[styles.centerSuit, { color: getSuitColor(suit) }]}>{suit}</Text>
            </View>
            <View style={[styles.bottomRight, styles.topLeft]}>
              <Text style={[styles.rank, styles.upsideDown, { color: getSuitColor(suit) }]}>
                {rank}
              </Text>
              <Text style={[styles.suit, styles.upsideDown, { color: getSuitColor(suit) }]}>
                {suit}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.cardBack}>
            <Text style={styles.cardBackPattern}>♠♥♦♣</Text>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    padding: 4,
  },
  topLeft: {
    position: 'absolute',
    top: 4,
    left: 4,
    alignItems: 'center',
  },
  rank: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  suit: {
    fontSize: 12,
  },
  suitText: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerSuit: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomRight: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  upsideDown: {
    transform: [{ rotate: '180deg' }],
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackPattern: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});