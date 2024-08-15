import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, SafeAreaView, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';

const CenteredView = styled(View);
const StyledButton = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledDiv = styled(TouchableOpacity);

const ChefDashboardScreen = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView className='flex-1'>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Profile and Location */}
          <View className='flex-row justify-between items-center mb-6'>
            <TouchableOpacity onPress={() => { /* Navigate to Profile */ }}>
              <Icon.MoreVertical stroke={themeColors.text} width={24} height={24} />
            </TouchableOpacity>
            <Text className='text-lg font-bold'>{/* Location Name */} Sydney, Australia</Text>
          </View>

          {/* Running Orders Section */}
          <View className='mb-6'>
            <Text className='text-xl font-bold mb-4'>Running Orders</Text>
            <StyledDiv
              className='p-4 rounded-lg bg-white shadow-lg mb-4'
              onPress={() => navigation.navigate('OrderDetailScreen', { orderId: '123' })}
            >
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={{ width: 100, height: 100, marginBottom: 10 }} />
              <Text className='font-bold'>Item Name</Text>
              <Text className='text-gray-500'>#Breakfast</Text>
              <Text className='text-gray-700'>Order ID: 12345</Text>
              <Text className='text-green-500'>$25.00</Text>
              <View className='flex-row justify-between mt-4'>
                <StyledButton className='bg-green-500 px-4 py-2 rounded'>
                  <Text className='text-white'>Done</Text>
                </StyledButton>
                <StyledButton className='bg-red-500 px-4 py-2 rounded'>
                  <Text className='text-white'>Cancel</Text>
                </StyledButton>
              </View>
              <StyledTextInput
                placeholder='Reason for cancellation...'
                style={[styles.input, { width: width * 0.9 }]}
              />
            </StyledDiv>
          </View>

          {/* Order Requests Section */}
          <View className='mb-6'>
            <Text className='text-xl font-bold mb-4'>Order Requests</Text>
            <StyledDiv
              className='p-4 rounded-lg bg-white shadow-lg mb-4'
              onPress={() => navigation.navigate('OrderRequestDetailScreen', { requestId: '789' })}
            >
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={{ width: 100, height: 100, marginBottom: 10 }} />
              <Text className='font-bold'>Item Name</Text>
              <Text className='text-gray-500'>Pickup</Text>
              <Text className='text-gray-700'>Order ID: 12345</Text>
              <Text className='text-green-500'>$25.00</Text>
              <Text className='text-gray-700'>Time: 12:00 PM</Text>
              <View className='flex-row justify-between mt-4'>
                <StyledButton className='bg-green-500 px-4 py-2 rounded'>
                  <Text className='text-white'>Accept</Text>
                </StyledButton>
                <StyledButton className='bg-red-500 px-4 py-2 rounded'>
                  <Text className='text-white'>Deny</Text>
                </StyledButton>
              </View>
              <StyledTextInput
                placeholder='Notes...'
                style={[styles.input, { width: width * 0.9 }]}
              />
            </StyledDiv>
          </View>

          {/* Total Revenue Graph */}
          <View className='mb-6'>
            <Text className='text-xl font-bold mb-4'>Total Revenue</Text>
            {/* Placeholder for graph */}
            <StyledDiv className='h-40 bg-gray-200 rounded-lg justify-center items-center'>
              <Text className='text-gray-500'>Graph Placeholder</Text>
            </StyledDiv>
            <StyledButton
              onPress={() => navigation.navigate('RevenueDetailScreen')}
              className='mt-4 bg-blue-500 px-4 py-2 rounded'
            >
              <Text className='text-white text-center'>See Details</Text>
            </StyledButton>
          </View>

          {/* Reviews Section */}
          <View className='mb-6'>
            <Text className='text-xl font-bold mb-4'>Reviews</Text>
            <Text className='text-lg font-bold'>4.5/5</Text>
            <Text className='text-gray-500'>100 Reviews</Text>
            <StyledButton
              onPress={() => navigation.navigate('ReviewsScreen')}
              className='mt-4 bg-blue-500 px-4 py-2 rounded'
            >
              <Text className='text-white text-center'>See All Reviews</Text>
            </StyledButton>
          </View>

          {/* Popular Items Section */}
          <View>
            <Text className='text-xl font-bold mb-4'>Popular Items</Text>
            <View className='flex-row'>
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={{ width: 100, height: 100, marginRight: 10 }} />
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={{ width: 100, height: 100 }} />
            </View>
            <StyledButton
              onPress={() => navigation.navigate('PopularItemsScreen')}
              className='mt-4 bg-blue-500 px-4 py-2 rounded'
            >
              <Text className='text-white text-center'>See All</Text>
            </StyledButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: '#DDD',
  },
});

export default ChefDashboardScreen;
