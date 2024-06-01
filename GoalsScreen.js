import React, { useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GoalsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, email, password, firstName, lastName, workTitle } = route.params;
  const [searchText, setSearchText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    { label: '😎 Confidence', value: '😎Confidence' },
    { label: '📚 Organization', value: '📚Organization' },
    { label: '⏳ Time Management', value: '⏳Time Management' },
    { label: '✍ Preparedness', value: '✍Preparedness' },
    { label: '🤵 Leadership', value: '🤵Leadership' },
    { label: '👨🏼‍🤝‍👨🏻 Personability', value: '👨🏼‍🤝‍👨🏻Personability' },
    { label: '🎨 Creativity', value: '🎨Creativity' },
    { label: '🗣 Understandability', value: '🗣Understandability' },
  ];

  const handleFinish = (skip = false) => {
    fetch('http://192.168.0.100:5000/api/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        firstName,
        lastName,
        workTitle,
        goals: skip ? [] : selectedItems,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('ProfileTabs', {
          screen: 'Profile',
          params: {
            username,
            email,
            firstName,
            lastName,
            workTitle,
            goals: skip ? [] : selectedItems,
          },
        });
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error', 'Failed to create account. Please check your internet connection.');
      });
  };

  const handleSelectItem = (value) => {
    let updatedSelectedItems;
    if (selectedItems.includes(value)) {
      updatedSelectedItems = selectedItems.filter(item => item !== value);
    } else {
      updatedSelectedItems = [...selectedItems, value];
    }
    setSelectedItems(updatedSelectedItems);
    setSearchText(updatedSelectedItems.join(', '));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          placeholder="Search for goals or type your own"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
        <View style={styles.optionsContainer}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedItems.includes(item.value) && styles.selectedOption
              ]}
              onPress={() => handleSelectItem(item.value)}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => handleFinish(true)}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
        <Button title="Finish" onPress={() => handleFinish(false)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: 'green',
  },
  optionText: {
    color: 'black',
  },
  skipText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
});

export default GoalsScreen;