import React from 'react';
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
import { styled } from 'nativewind';
import { EXAMPLE_ORDERS } from '@/constants';

const StyledButton = styled(TouchableOpacity);

const ChefRunningOrdersScreen = () => {
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
      <View className='flex-col justify-center items-center gap-4'>
        <Text style={styles.orderDueText}>
          Order is due on {item.orderDueDate} at {item.orderDueTime}
        </Text>
        <Text style={styles.orderDueUrgentText}>15 minutes left!</Text>
        <Text style={styles.orderDueText}>1 day 2 hrs left.</Text>
        <View style={styles.buttonContainer}>
          <StyledButton
            style={[styles.actionButton, styles.readyButton]}
            onPress={() => {
              // TODO: Handle accept order action
              console.log('Order marked as ready.');
            }}
          >
            <Text style={styles.actionButtonText}>Order is Ready</Text>
          </StyledButton>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 p-16 bg-white'>
      <ImageBackground
        source={require('../../../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />
      <View style={styles.container}>
        {/* Back Button */}
        {/* <StyledButton onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon.ChevronLeft strokeWidth={4} stroke='white' />
        </StyledButton> */}
        <Text style={styles.headerText}>Running Orders</Text>
      </View>
      {/* Orders List */}
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
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: -5,
  },
  container: {
    paddingHorizontal: 35,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 16,
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
  orderDueUrgentText: {
    fontWeight: 'bold',
    color: themeColors.button,
    marginTop: 2,
    textAlign: 'center',
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
  // backButton: {
  //   backgroundColor: themeColors.button,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   alignSelf: 'flex-start',
  //   borderRadius: 20,
  //   padding: 10,
  //   marginTop: 16,
  // },
  headerText: {
    fontSize: 25,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    marginVertical: 20,
    color: themeColors.grayDisplayText,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: 200,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
  },
  readyButton: {
    backgroundColor: themeColors.button,
  },
});

export default ChefRunningOrdersScreen;
