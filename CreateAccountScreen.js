import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateAccountScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleNext = () => {
    if (!username || !email || !password || !retypePassword) {
      Alert.alert('All fields are required');
      return;
    } else if (password !== retypePassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    navigation.navigate('AdditionalInfo', {
      username,
      email,
      password,
    });
  };

  const handleLoginClick = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Retype Password"
          secureTextEntry
          value={retypePassword}
          onChangeText={setRetypePassword}
          style={styles.input}
        />
        <Button title="Next" onPress={handleNext} />
        <TouchableOpacity onPress={handleLoginClick}>
          <Text style={styles.loginLink}>Click here to Login</Text>
        </TouchableOpacity>
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
  loginLink: {
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default CreateAccountScreen;