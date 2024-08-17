import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { EXAMPLE_ORDERS } from '@/constants';

const StyledDiv = styled(TouchableOpacity);

const ChefPastOrdersScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../../../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const pastOrders = EXAMPLE_ORDERS;

  const renderOrderItem = ({ item }) => (
    <View>
      <View style={styles.orderItem}>
        <Image source={item.itemImage} style={styles.orderImage} />
        <View style={styles.orderTextContainer}>
          <Text style={styles.personName}>{item.personName}</Text>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text style={styles.orderDetails}>Order ID: {item.orderId}</Text>
          <Text style={styles.orderDetails}>Date: {item.orderDate}</Text>
          <Text style={styles.orderDetails}>Time: {item.orderTime}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>{item.tag}</Text>
          </View>
        </View>
      </View>
      <View className='flex-row justify-center items-center gap-4'>
        <Text style={styles.orderDueText}>
          Order was for {item.orderDueDate} at {item.orderDueTime}
        </Text>
      </View>
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
          Completed Orders ({pastOrders.length})
        </Text>
      </View>

      {/* Past Orders List */}
      <FlatList
        style={styles.orderListContainer}
        data={EXAMPLE_ORDERS}
        renderItem={renderOrderItem}
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
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  orderTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 16,
    padding: 5,
  },
  personName: {
    fontWeight: '600',
    color: themeColors.grayDisplayText,
  },
  itemName: {
    fontWeight: '500',
    color: themeColors.grayDisplayText,
    marginTop: 2,
  },
  orderDetails: {
    fontWeight: '400',
    color: themeColors.grayText,
    marginTop: 2,
  },
  orderDueText: {
    fontWeight: 'bold',
    color: themeColors.grayText,
    marginTop: 2,
    textAlign: 'center',
  },
  tagContainer: {
    backgroundColor: themeColors.buttonBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  tag: {
    color: themeColors.button,
    fontFamily: 'Inter',
    fontSize: 12,
    padding: 2,
  },
  separator: {
    height: 1,
    backgroundColor: themeColors.inactiveButton,
    marginVertical: 8,
  },
  orderListContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 16,
  },
});

export default ChefPastOrdersScreen;
