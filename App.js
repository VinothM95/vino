import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from './CreateAccountScreen';
import AdditionalInfoScreen from './AdditionalInfoScreen';
import GoalsScreen from './GoalsScreen';
import ProfileTabs from './ProfileTabs'; // Import ProfileTabs instead of HomeScreen
import LoginScreen from './LoginScreen';
import FeedbackScreen from './FeedbackScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdditionalInfo" component={AdditionalInfoScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="ProfileTabs" component={ProfileTabs} options={{ headerShown: false }} /> 
        <Stack.Screen name="Feedback" component={FeedbackScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;