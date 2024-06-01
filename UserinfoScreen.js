import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { getUserDetails, sendFollowRequest } from './api'; // Import the necessary functions

const UserinfoScreen = ({ route }) => {
  const { username } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const data = await getUserDetails(username);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleFollow = async () => {
    try {
      await sendFollowRequest(user._id); // Assuming the user ID is available in the user data
      Alert.alert('Follow request sent');
    } catch (error) {
      console.error('Error sending follow request:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user.profileImage ? (
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.noImage}>
            <Text>No Image</Text>
          </View>
        )}
        <Button title="Follow" onPress={handleFollow} />
      </View>
      <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.workTitle}>{user.workTitle}</Text>
      <Text style={styles.goals}>{user.goals}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  noImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  username: {
    fontSize: 18,
    color: 'gray',
  },
  workTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  goals: {
    fontSize: 14,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserinfoScreen;