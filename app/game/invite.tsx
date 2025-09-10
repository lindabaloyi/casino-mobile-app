import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameInviteScreen() {
  const pendingInvites = [
    { id: '1', from: 'Alice', gameType: 'Casino', timestamp: '2 min ago' },
    { id: '2', from: 'Bob', gameType: 'Casino', timestamp: '5 min ago' },
  ];

  const sentInvites = [
    { id: '3', to: 'Charlie', status: 'Pending', timestamp: '1 min ago' },
    { id: '4', to: 'Diana', status: 'Accepted', timestamp: '3 min ago' },
  ];

  const handleAcceptInvite = (inviteId: string) => {
    // TODO: Implement accept invite logic
    console.log('Accepting invite:', inviteId);
  };

  const handleDeclineInvite = (inviteId: string) => {
    // TODO: Implement decline invite logic
    console.log('Declining invite:', inviteId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Invites</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Invites</Text>
        <FlatList
          data={pendingInvites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.inviteItem}>
              <View style={styles.inviteInfo}>
                <Text style={styles.inviteFrom}>{item.from}</Text>
                <Text style={styles.inviteGame}>{item.gameType}</Text>
                <Text style={styles.inviteTime}>{item.timestamp}</Text>
              </View>
              <View style={styles.inviteActions}>
                <TouchableOpacity
                  style={[styles.inviteButton, styles.acceptButton]}
                  onPress={() => handleAcceptInvite(item.id)}
                >
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.inviteButton, styles.declineButton]}
                  onPress={() => handleDeclineInvite(item.id)}
                >
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sent Invites</Text>
        <FlatList
          data={sentInvites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.sentInviteItem}>
              <View style={styles.inviteInfo}>
                <Text style={styles.inviteFrom}>To: {item.to}</Text>
                <Text style={[styles.inviteStatus, item.status === 'Accepted' && styles.statusAccepted]}>
                  {item.status}
                </Text>
                <Text style={styles.inviteTime}>{item.timestamp}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inviteItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sentInviteItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  inviteInfo: {
    flex: 1,
  },
  inviteFrom: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inviteGame: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  inviteStatus: {
    fontSize: 14,
    color: '#ffc107',
    marginTop: 2,
  },
  statusAccepted: {
    color: '#28a745',
  },
  inviteTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  inviteActions: {
    flexDirection: 'row',
    gap: 10,
  },
  inviteButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: '#28a745',
  },
  declineButton: {
    backgroundColor: '#dc3545',
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  declineButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});