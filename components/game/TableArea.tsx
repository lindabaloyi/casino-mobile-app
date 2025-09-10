import { Card } from '@/components/ui/Card';
import { Build, Card as CardType } from '@/types/game';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TableAreaProps {
  tableCards: (CardType | Build)[];
  onCardPress?: (card: CardType | Build) => void;
  onDropZone?: (x: number, y: number) => void;
}

export function TableArea({ tableCards, onCardPress, onDropZone }: TableAreaProps) {
  const renderTableCard = (item: CardType | Build, index: number) => {
    if ('type' in item && item.type === 'build') {
      // Render build
      const build = item as Build;
      return (
        <View key={build.id} style={styles.buildContainer}>
          <View style={styles.buildHeader}>
            <Text style={styles.buildValue}>Build: {build.value}</Text>
            <Text style={styles.buildOwner}>Player {build.owner + 1}</Text>
          </View>
          <View style={styles.buildCards}>
            {build.cards.map((card, cardIndex) => (
              <Card
                key={card.id}
                suit={card.suit}
                rank={card.rank}
                value={card.value}
                faceUp={true}
                draggable={false}
                style={styles.buildCard}
              />
            ))}
          </View>
        </View>
      );
    } else {
      // Render single card
      const card = item as CardType;
      return (
        <Card
          key={card.id}
          suit={card.suit}
          rank={card.rank}
          value={card.value}
          faceUp={true}
          draggable={true}
          onPress={() => onCardPress?.(card)}
          style={styles.tableCard}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Table Cards</Text>

      <View style={styles.tableSurface}>
        {tableCards.length === 0 ? (
          <View style={styles.emptyTable}>
            <Text style={styles.emptyText}>No cards on table</Text>
            <Text style={styles.emptySubtext}>Play a card to start</Text>
          </View>
        ) : (
          <View style={styles.cardsGrid}>
            {tableCards.map((card, index) => renderTableCard(card, index))}
          </View>
        )}
      </View>

      {/* Invisible drop zone for drag and drop */}
      <View
        style={styles.dropZone}
        onTouchEnd={(event) => {
          const { locationX, locationY } = event.nativeEvent;
          onDropZone?.(locationX, locationY);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  tableSurface: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTable: {
    alignItems: 'center',
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  tableCard: {
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  buildContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  buildHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  buildValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buildOwner: {
    color: '#4CAF50',
    fontSize: 12,
    marginTop: 2,
  },
  buildCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  buildCard: {
    transform: [{ scale: 0.8 }],
  },
  dropZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});