import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';

import ChefDashboardScreen from './ChefDashboardScreen';
import ChefRunningOrdersScreen from './ChefRunningOrdersScreen';
import ChefOrderRequestsScreen from './ChefOrderRequestsScreen';
import ChefFoodListStackScreen from '../Items/ChefFoodListStackScreen';
import ChefNotificationScreen from '../Main/ChefNotificationScreen';
import ChefAccountStackScreen from '../Account/ChefAccountStackScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      className='flex-row justify-around items-center mt-auto px-2 pb-8 bg-white w-full'
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

        const tabColor = isFocused ? themeColors.button : themeColors.grayText;
        const tabStrokeWidth = 2.5;
        const tabIconWidth = 21;
        const tabIconHeight = 21;

        const IconComponent = {
          Dashboard: () => (
            <View style={[styles.routeTab]}>
              <View
                style={[
                  isFocused && {
                    backgroundColor: themeColors.buttonBg,
                    borderRadius: 50,
                  },
                  { paddingHorizontal: 4, paddingBottom: 4 },
                ]}
              >
                <Icon.Grid
                  stroke={tabColor}
                  width={tabIconWidth}
                  height={tabIconHeight}
                  strokeWidth={tabStrokeWidth}
                />
              </View>
              <Text
                className='font-semibold ml-2'
                style={[styles.routeTabText, { color: tabColor }]}
              >
                Home
              </Text>
            </View>
          ),
          RunningOrders: () => (
            <View style={[styles.routeTab]}>
              <View
                style={[
                  isFocused && {
                    backgroundColor: themeColors.buttonBg,
                    borderRadius: 50,
                  },
                  { paddingHorizontal: 4, paddingBottom: 4 },
                ]}
              >
                <Icon.Calendar
                  stroke={tabColor}
                  width={tabIconWidth}
                  height={tabIconHeight}
                  strokeWidth={tabStrokeWidth}
                />
              </View>
              <Text
                className='font-semibold ml-2'
                style={[styles.routeTabText, { color: tabColor }]}
              >
                Orders
              </Text>
            </View>
          ),
          OrderRequests: () => (
            <View style={[styles.routeTab]}>
              <View
                style={[
                  isFocused && {
                    backgroundColor: themeColors.buttonBg,
                    borderRadius: 50,
                  },
                  { paddingHorizontal: 4, paddingBottom: 4 },
                ]}
              >
                <Icon.Edit3
                  stroke={tabColor}
                  width={tabIconWidth}
                  height={tabIconHeight}
                  strokeWidth={tabStrokeWidth}
                />
              </View>
              <Text
                className='font-semibold ml-2'
                style={[styles.routeTabText, { color: tabColor }]}
              >
                Requests
              </Text>
            </View>
          ),
          FoodList: () => (
            <View style={[styles.routeTab]}>
              <View
                style={[
                  isFocused && {
                    backgroundColor: themeColors.buttonBg,
                    borderRadius: 50,
                  },
                  { paddingHorizontal: 4, paddingBottom: 4 },
                ]}
              >
                <Icon.List
                  stroke={tabColor}
                  width={tabIconWidth}
                  height={tabIconHeight}
                  strokeWidth={tabStrokeWidth}
                />
              </View>
              <Text
                className='font-semibold ml-2'
                style={[styles.routeTabText, { color: tabColor }]}
              >
                Items
              </Text>
            </View>
          ),
          Notifications: () => (
            <View style={[styles.routeTab]}>
              <View
                style={[
                  isFocused && {
                    backgroundColor: themeColors.buttonBg,
                    borderRadius: 50,
                  },
                  { paddingHorizontal: 4, paddingBottom: 4 },
                ]}
              >
                <Icon.Bell
                  stroke={tabColor}
                  width={tabIconWidth}
                  height={tabIconHeight}
                  strokeWidth={tabStrokeWidth}
                />
              </View>
              <Text
                className='font-semibold ml-2'
                style={[styles.routeTabText, { color: tabColor }]}
              >
                Recent
              </Text>
            </View>
          ),
          Account: () => (
            <View style={[styles.routeTab]}>
              <View
                style={[
                  isFocused && {
                    backgroundColor: themeColors.buttonBg,
                    borderRadius: 50,
                  },
                  { paddingHorizontal: 4, paddingBottom: 4 },
                ]}
              >
                <Icon.User
                  stroke={tabColor}
                  width={tabIconWidth}
                  height={tabIconHeight}
                  strokeWidth={tabStrokeWidth}
                />
              </View>
              <Text
                className='font-semibold ml-2'
                style={[styles.routeTabText, { color: tabColor }]}
              >
                Profile
              </Text>
            </View>
          ),
        }[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole='button'
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
      screenOptions={{ headerShown: false }} // Hide the default header
    >
      <Tab.Screen name='Dashboard' component={ChefDashboardScreen} />
      <Tab.Screen name='RunningOrders' component={ChefRunningOrdersScreen} />
      <Tab.Screen name='OrderRequests' component={ChefOrderRequestsScreen} />
      <Tab.Screen name='FoodList' component={ChefFoodListStackScreen} />
      <Tab.Screen name='Notifications' component={ChefNotificationScreen} />
      <Tab.Screen name='Account' component={ChefAccountStackScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    backgroundColor: '#FFFFFF',
    shadowColor: themeColors.shadowColor,
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10, // for Android shadow
  },
  routeTab: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    gap: 0,
    textAlign: 'center',
  },
  routeTabText: {
    fontSize: 10,
    textAlign: 'center',
  },
});

export default ChefHomeScreen;
