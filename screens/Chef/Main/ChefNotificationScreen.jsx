import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { themeColors } from '@/theme';
import { useFonts } from 'expo-font';
import { NOTIF_TYPES, EXAMPLE_NOTIFICATIONS } from '../../../constants';

const ChefNotificationScreen = () => {
  const [activeTab, setActiveTab] = useState('Notifications');
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../../../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image
        source={item.type in NOTIF_TYPES ? NOTIF_TYPES[item.type] : item.image}
        style={styles.notifImage}
      />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.action}>{item.action}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {item.image !== '' && (
        <Image source={item.image} style={styles.notifImage} />
      )}
    </View>
  );

  return (
    <SafeAreaView className='flex-1 p-16 bg-white'>
      <ImageBackground
        source={require('../../../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />
      <View style={styles.container}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('Notifications')}
          style={[
            styles.tab,
            activeTab === 'Notifications' && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Notifications' && styles.activeTabText,
            ]}
          >
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // TODO: Once implemented, set activeTab to 'Messages'
          style={[styles.tab, activeTab === 'Messages' && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Messages' && styles.activeTabText,
            ]}
          >
            Messages (0)
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.notifListContainer}
        data={EXAMPLE_NOTIFICATIONS}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: -5,
  },
  container: {
    paddingHorizontal: 35,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    marginVertical: 20,
    color: themeColors.grayDisplayText,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.inactiveButton,
    paddingHorizontal: 35,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 16,
    color: '#cfd0d3',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: themeColors.button,
  },
  activeTabText: {
    color: themeColors.button,
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  notifImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  notificationTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 16,
    padding: 5,
  },
  title: {
    fontWeight: '600',
    color: '#333',
  },
  action: {
    fontWeight: '400',
    color: themeColors.grayText,
  },
  time: {
    marginTop: 8,
    fontWeight: '400',
    color: themeColors.grayText,
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: themeColors.inactiveButton,
    marginVertical: 8,
  },
  notifListContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 0,
  },
});

export default ChefNotificationScreen;
