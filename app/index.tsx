import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const handleGameModeSelect = (mode: 'cpu' | 'local' | 'invite') => {
    switch (mode) {
      case 'cpu':
        router.push('/game/cpu');
        break;
      case 'local':
        router.push('/game/local');
        break;
      case 'invite':
        router.push('/game/invite');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🎴 Casino</Text>
        <Text style={styles.subtitle}>Choose your game</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cpuButton]}
            onPress={() => handleGameModeSelect('cpu')}
          >
            <Text style={styles.buttonEmoji}>🤖</Text>
            <Text style={styles.buttonText}>CPU</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.multiplayerButton]}
            onPress={() => handleGameModeSelect('local')}
          >
            <Text style={styles.buttonEmoji}>👥</Text>
            <Text style={styles.buttonText}>Multiplayer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.inviteButton]}
            onPress={() => handleGameModeSelect('invite')}
          >
            <Text style={styles.buttonEmoji}>📨</Text>
            <Text style={styles.buttonText}>Send Invite</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 280,
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cpuButton: {
    backgroundColor: '#007AFF',
  },
  multiplayerButton: {
    backgroundColor: '#28a745',
  },
  inviteButton: {
    backgroundColor: '#ffc107',
  },
  buttonEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});