import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';

import ChefDashboardScreen from './ChefDashboardScreen';
import ChefNotificationScreen from './ChefNotificationScreen';
import ChefFoodListStackScreen from './ChefFoodListStackScreen';
import ChefAccountStackScreen from './ChefAccountStackScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      className='flex-row justify-around items-center mt-auto p-4 pb-8 bg-white w-full'
      style={styles.shadowProp}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent = {
          Dashboard: () => isFocused ? (
            <View className='flex-row justify-center items-center p-2 rounded-full' style={{ backgroundColor: themeColors.buttonBg }}>
              <Icon.Grid stroke={themeColors.button} strokeWidth={2} />
              <Text className='font-semibold ml-2' style={{ color: themeColors.button }}>Dashboard</Text>
            </View>
          ) : (<Icon.Grid stroke={themeColors.button} strokeWidth={2} />),
          FoodList: () => isFocused ? (
            <View className='flex-row justify-center items-center p-2 rounded-full' style={{ backgroundColor: themeColors.buttonBg }}>
              <Icon.List stroke={themeColors.button} strokeWidth={2} />
              <Text className='font-semibold ml-2' style={{ color: themeColors.button }}>My Food List</Text>
            </View>
          ) : (<Icon.List stroke={themeColors.button} strokeWidth={2} />),
          Notifications: () => isFocused ? (
            <View className='flex-row justify-center items-center p-2 rounded-full' style={{ backgroundColor: themeColors.buttonBg }}>
              <Icon.Bell stroke={themeColors.button} strokeWidth={2} />
              <Text className='font-semibold ml-2' style={{ color: themeColors.button }}>Notifications</Text>
            </View>
          ) : (<Icon.Bell stroke={themeColors.button} strokeWidth={2} />),
          Account: () => isFocused ? (
            <View className='flex-row justify-center items-center p-2 rounded-full' style={{ backgroundColor: themeColors.buttonBg }}>
              <Icon.User stroke={themeColors.button} strokeWidth={2} />
              <Text className='font-semibold ml-2' style={{ color: themeColors.button }}>Profile</Text>
            </View>
          ) : (<Icon.User stroke={themeColors.button} strokeWidth={2} />),
        }[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            className='bg-transparent p-2'
          >
            <IconComponent />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ChefHomeScreen = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}  // Hide the default header
    >
      <Tab.Screen name="Dashboard" component={ChefDashboardScreen} />
      <Tab.Screen name="FoodList" component={ChefFoodListStackScreen} />
      <Tab.Screen name="Notifications" component={ChefNotificationScreen} />
      <Tab.Screen name="Account" component={ChefAccountStackScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default ChefHomeScreen;
