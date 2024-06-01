import React, { useState } from 'react';
import { View, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AdditionalInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, email, password } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workTitle, setWorkTitle] = useState('');

  const handleNext = () => {
    navigation.navigate('Goals', {
      username,
      email,
      password,
      firstName,
      lastName,
      workTitle,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Work or School Title"
          value={workTitle}
          onChangeText={setWorkTitle}
          style={styles.input}
        />
        <Button title="Back" onPress={handleBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
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
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});

export default AdditionalInfoScreen;