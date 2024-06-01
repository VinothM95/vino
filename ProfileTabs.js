
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import FeedbackScreen from './FeedbackScreen';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

const ProfileTabs = ({ route }) => {
  const { username, email, firstName, lastName, workTitle, goals } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Feedback') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'yellow',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: { backgroundColor: '#1e1e1e' },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ username, email, firstName, lastName, workTitle, goals }} />
      <Tab.Screen name="Notification">
        {() => <NotificationScreen username={username} />}
      </Tab.Screen>
      <Tab.Screen name="Feedback" component={FeedbackScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default ProfileTabs;