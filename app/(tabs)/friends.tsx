import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FriendsScreen() {
  const friends = [
    { id: '1', name: 'Alice', status: 'Online', lastSeen: 'Now' },
    { id: '2', name: 'Bob', status: 'Offline', lastSeen: '2 hours ago' },
    { id: '3', name: 'Charlie', status: 'In Game', lastSeen: 'Playing Casino' },
  ];

  const handleInvite = (friendId: string) => {
    // TODO: Implement invitation logic
    console.log(`Inviting friend ${friendId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Friend</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={[
                styles.friendStatus,
                item.status === 'Online' && styles.statusOnline,
                item.status === 'Offline' && styles.statusOffline,
                item.status === 'In Game' && styles.statusInGame,
              ]}>
                {item.status}
              </Text>
              <Text style={styles.lastSeen}>{item.lastSeen}</Text>
            </View>
            {item.status === 'Online' && (
              <TouchableOpacity
                style={styles.inviteButton}
                onPress={() => handleInvite(item.id)}
              >
                <Text style={styles.inviteButtonText}>Invite</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendStatus: {
    fontSize: 14,
    marginTop: 2,
  },
  statusOnline: {
    color: '#28a745',
  },
  statusOffline: {
    color: '#6c757d',
  },
  statusInGame: {
    color: '#ffc107',
  },
  lastSeen: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  inviteButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  inviteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});