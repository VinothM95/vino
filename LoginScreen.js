import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './api';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const userProfile = await loginUser({ username, password });

      Alert.alert('Success', 'Logged in successfully');
      // Navigate to the ProfileTabs with the full user profile data
      navigation.navigate('ProfileTabs', userProfile);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
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
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button title={loading ? "Loading..." : "Login"} onPress={handleLogin} disabled={loading} />
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.createAccountText}>Create Account</Text>
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
  createAccountText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;