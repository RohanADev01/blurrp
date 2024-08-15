import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChefItemListScreen from './ChefItemListScreen';
import ChefItemDetailsScreen from './ChefItemDetailsScreen';
import ChefAddNewItemScreen from './ChefAddNewItemScreen';
import ChefEditItemScreen from './ChefEditItemScreen';

const Stack = createStackNavigator();

const ChefFoodListStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChefItemList"
        component={ChefItemListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChefItemDetails"
        component={ChefItemDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChefAddNewItem"
        component={ChefAddNewItemScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChefEditItem"
        component={ChefEditItemScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChefFoodListStackScreen;
