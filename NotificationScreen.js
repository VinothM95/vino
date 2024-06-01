import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const NotificationScreen = ({ username }) => {
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState(0);

  useEffect(() => {
    fetchClaimedRewards(username);
  }, [username]);

  const fetchClaimedRewards = async (username) => {
    try {
      const response = await fetch(`http://192.168.0.100:5000/api/claimed-rewards?username=${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch claimed rewards');
      }
      const data = await response.json();
      setTotalRewards(data.totalRewards);
      setClaimedRewards(data.claimedRewards || []);
    } catch (error) {
      console.error('Error fetching claimed rewards:', error);
    }
  };

  const claimReward = async () => {
    try {
      const response = await fetch('http://192.168.0.100:5000/api/claim-reward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, points: 100 }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to claim reward');
      }

      const data = await response.json();
      Alert.alert('Success', data.message);
      fetchClaimedRewards(username);
    } catch (error) {
      console.error('Error claiming reward:', error);
      Alert.alert('Error', error.message || 'Something went wrong!');
    }
  };

  const renderDay = (day, index) => {
    const today = new Date().getDay();
    const isToday = today === index;
    const claimedToday = claimedRewards.some(reward => new Date(reward.dateClaimed).getDay() === index);

    return (
      <View key={index} style={[styles.dayContainer, isToday ? styles.todayContainer : null]}>
        <Text style={styles.dayText}>{day}</Text>
        {claimedToday && <Text style={styles.claimedText}>Claimed</Text>}
        {!claimedToday && isToday && (
          <TouchableOpacity style={styles.claimButton} onPress={claimReward}>
            <Text style={styles.claimButtonText}>Claim 100 SP</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>This is the Notification Screen</Text>
      <Text>Total Rewards: {totalRewards}</Text>
      <View style={styles.daysContainer}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => renderDay(day, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 10,
  },
  todayContainer: {
    backgroundColor: '#cce7ff',
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
  },
  claimedText: {
    color: 'green',
    fontWeight: 'bold',
  },
  claimButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default NotificationScreen;