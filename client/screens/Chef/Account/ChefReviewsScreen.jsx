import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { EXAMPLE_NOTIFICATIONS, NOTIF_TYPES } from '@/constants';

const StyledDiv = styled(TouchableOpacity);

const ChefReviewsScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../../../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Image source={NOTIF_TYPES['userNotif']} style={styles.reviewImage} />
      <View style={styles.reviewTextContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.action}>{item.action}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {item.image !== '' && (
        <Image source={item.image} style={styles.reviewImage} />
      )}
    </View>
  );

  return (
    <SafeAreaView className='flex-1 pt-10 py-12 bg-white'>
      <ImageBackground
        source={require('../../../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />
      <View style={styles.container}>
        {/* Back Button */}
        <StyledDiv
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          className='z-10 rounded-2xl p-4 shadow mt-8'
        >
          <Icon.ChevronLeft strokeWidth={4} stroke='white' />
        </StyledDiv>
        <Text
          className='text-black font-bold my-6 tracking-widest'
          style={[styles.text, { fontFamily: 'Inter', fontSize: 25 }]}
        >
          User Reviews
        </Text>
      </View>

      {/* User Review List */}
      <FlatList
        style={styles.reviewListContainer}
        data={EXAMPLE_NOTIFICATIONS.filter((item) =>
          item.action.includes('review')
        )}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
  },
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: -5,
  },
  text: {
    paddingHorizontal: 0,
  },
  backButton: {
    backgroundColor: themeColors.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    borderRadius: 20,
    padding: 10,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.grayDisplayText,
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  reviewImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  reviewTextContainer: {
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
  reviewListContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 16,
  },
});

export default ChefReviewsScreen;
