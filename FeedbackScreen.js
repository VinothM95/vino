import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, StyleSheet } from 'react-native';

const FeedbackScreen = () => {
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState('');
  const [showPromptInput, setShowPromptInput] = useState(false);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const response = await fetch('http://192.168.0.100:5000/api/prompts');
      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };

  const handleAddPrompt = async () => {
    if (!newPrompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.100:5000/api/add-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: newPrompt }),
      });

      if (response.ok) {
        const { promptId } = await response.json();
        setPrompts([...prompts, { _id: promptId, prompt: newPrompt }]);
        setNewPrompt('');
        setShowPromptInput(false);
        Alert.alert('Success', 'Prompt added successfully!');
      } else {
        Alert.alert('Error', 'Failed to add prompt');
      }
    } catch (error) {
      console.error('Error adding prompt:', error);
      Alert.alert('Error', 'Failed to add prompt');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.heading}>Prompt</Text>
        <FlatList
          data={prompts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Text style={styles.prompt}>{item.prompt}</Text>}
        />
        {showPromptInput ? (
          <View style={styles.promptInputContainer}>
            <TextInput
              placeholder="Enter new prompt"
              value={newPrompt}
              onChangeText={setNewPrompt}
              style={styles.input}
            />
            <Button title="Add" onPress={handleAddPrompt} />
          </View>
        ) : (
          <Button title="+ Add a New Prompt" onPress={() => setShowPromptInput(true)} />
        )}
      </View>
      <View style={styles.column}>
        <Text style={styles.heading}>My Feedback</Text>
        {/* This can be populated with actual feedback data */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  column: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  prompt: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  promptInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
});

export default FeedbackScreen;