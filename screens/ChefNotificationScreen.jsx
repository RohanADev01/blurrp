import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, TextInput, ImageBackground } from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { NOTIF_TYPES, EXAMPLE_NOTIFICATIONS } from '../constants'

const CenteredView = styled(View);
const StyledButton = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledDiv = styled(TouchableOpacity);

const ChefNotificationScreen = () => {
  const [activeTab, setActiveTab] = useState('Notifications');
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={item.type in NOTIF_TYPES ? NOTIF_TYPES[item.type] : item.userImage} style={styles.userImage} />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.action}>{item.action}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {item.image !== '' && <Image source={item.image} style={styles.image} />}
    </View>
  );

  return (
    <SafeAreaView className='flex-1 p-16'>
      <ImageBackground
        source={require('../assets/images/FoodItemsScreenBgCorner.png')}
        style={styles.backgroundImg}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.ChevronLeft strokeWidth={2} stroke="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('Notifications')}
          style={[styles.tab, activeTab === 'Notifications' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'Notifications' && styles.activeTabText]}>
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // TODO: Once implemented, set activeTab to 'Messages'
          style={[styles.tab, activeTab === 'Messages' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'Messages' && styles.activeTabText]}>
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
    ...StyleSheet.absoluteFillObject, backgroundColor: 'white', opacity: 1, zIndex: -5
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
    fontFamily: 'Inter',
  },
  text: {
    paddingHorizontal: 35,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
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
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  userImage: {
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    marginVertical: 8,
  },
  notifListContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 0
  }
});

export default ChefNotificationScreen;
