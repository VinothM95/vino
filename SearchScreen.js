import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { getAllUsernames } from './api'; // Import the function to fetch usernames

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [filteredUsernames, setFilteredUsernames] = useState([]);

  useEffect(() => {
    fetchUsernames();
  }, []);

  const fetchUsernames = async () => {
    try {
      const data = await getAllUsernames(); // Call the function to fetch usernames
      setUsernames(data);
      setFilteredUsernames(data);
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = usernames.filter((username) =>
        username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsernames(filtered);
    } else {
      setFilteredUsernames(usernames);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.username}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by Username"
        value={searchText}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredUsernames}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontSize: 18,
  },
});

export default SearchScreen;