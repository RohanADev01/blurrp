import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Icon from 'react-native-feather'
import { themeColors } from '@/theme';
import DishRow from '../components/DishRow'
import CartStatus from '../components/CartStatus'
import { StatusBar } from 'expo-status-bar';

export default function RestaurantScreen () {
  const { params } = useRoute();
  const navigation = useNavigation();
  let vendor = params;

  // console.log('restaurant: ', vendor)
  // console.log('restaurant dishes: ', vendor.dishes)

  const { width } = Dimensions.get('window');

  return (
    <View>
      <CartStatus></CartStatus>
      <StatusBar style='light' />
      <ScrollView className='bg-white'>
        <View className='relative bg-gray-300'>
          <Image style={{ transform: [{ skewY: '6deg' }], translateY: -20 }} className='w-full h-56' source={vendor.image} />
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow'>
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View className='mt-4 pt-6'>
          <View className='px-5'>
            <Text className='text-3xl font-bold'>{vendor.name}</Text>
            <View className='flex-row space-x-2 my-1 mt-3'>
              <View className='flex-row items-center space-x-1'>
                <Text className='text-xs'>
                  <Text className='font-semibold text-gray-700'>{vendor.stars}</Text>
                </Text>
                <Image source={require('../assets/images/darkGrayStar.png')} className='h-3 w-3'></Image>
                <Text className='text-xs'>
                  <Text className='text-gray-700'>{vendor.ratings} ratings</Text>
                </Text>
                <Text className='font-semibold text-gray-700'>•</Text>
                <Text className='font-semibold text-xs text-gray-700'>
                  <Text>$$</Text>
                </Text>
                <Text className='font-semibold text-gray-700'>•</Text>
                <Text className='font-semibold text-xs text-gray-700'>
                  <Text>{vendor.category}</Text>
                </Text>
              </View>
            </View>
            <View className='flex-row space-x-2'>
              <View className='flex-row items-center space-x-1'>
                <Icon.MapPin color='gray' width='15' height='15' />
                <Text className='text-gray-700 text-xs'>{vendor.address}</Text>
                <Text className='font-semibold text-gray-700'>•</Text>
                <Text className='text-xs font-semibold text-gray-700'>
                  <Text>5.3 km</Text>
                </Text>
              </View>
            </View>
            <Text className='text-gray-500 mt-2 text-sm'>{vendor.description}</Text>
          </View>
        </View>
        <View className='pb-36 bg-white'>
          <Text className='px-4 py-4 text-2xl font-bold'>Menu</Text>
          {/* Dishes */}
          {
            vendor.dishes.map((dish, idx) => <DishRow item={{ ...dish }} key={idx} />)
          }
        </View>
      </ScrollView>
    </View>
  )
}