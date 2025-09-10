import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateGameScreen() {
  const [gameName, setGameName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreateGame = () => {
    // TODO: Implement game creation logic
    console.log('Creating game:', { gameName, isPrivate });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Game</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Game Name</Text>
        <TextInput
          style={styles.input}
          value={gameName}
          onChangeText={setGameName}
          placeholder="Enter game name"
          placeholderTextColor="#999"
        />

        <View style={styles.privacyContainer}>
          <Text style={styles.label}>Privacy</Text>
          <View style={styles.privacyOptions}>
            <TouchableOpacity
              style={[styles.privacyOption, !isPrivate && styles.privacyOptionActive]}
              onPress={() => setIsPrivate(false)}
            >
              <Text style={[styles.privacyText, !isPrivate && styles.privacyTextActive]}>
                Public
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.privacyOption, isPrivate && styles.privacyOptionActive]}
              onPress={() => setIsPrivate(true)}
            >
              <Text style={[styles.privacyText, isPrivate && styles.privacyTextActive]}>
                Private
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateGame}>
          <Text style={styles.createButtonText}>Create Game</Text>
        </TouchableOpacity>
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
    marginBottom: 30,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  privacyContainer: {
    marginBottom: 30,
  },
  privacyOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  privacyOption: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  privacyOptionActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  privacyText: {
    fontSize: 16,
    color: '#666',
  },
  privacyTextActive: {
    color: 'white',
  },
  createButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});