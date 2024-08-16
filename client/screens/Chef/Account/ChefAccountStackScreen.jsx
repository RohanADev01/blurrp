import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChefAccountScreen from './ChefAccountScreen';
import ChefProfileScreen from './ChefProfileScreen';
import ChefPastOrdersScreen from './ChefPastOrdersScreen';
import ChefReviewsScreen from './ChefReviewsScreen';

const Stack = createStackNavigator();

const ChefAccountStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='ChefAccount'
        component={ChefAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ChefProfile'
        component={ChefProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ChefPastOrders'
        component={ChefPastOrdersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ChefReviews'
        component={ChefReviewsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChefAccountStackScreen;
