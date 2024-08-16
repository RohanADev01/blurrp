import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme/index'
import RestaurantCard from './RestaurantCard'

const FeaturedRow = ({ title, restaurants, description }) => {
  return (
    <View>
      <View className='flex-row justify-between items-center px-4'>
        <View>
          <Text className='font-bold text-lg'>{title}</Text>
          <Text className='text-gray-500 text-xs'>
            {description}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: themeColors.text }} className='font-semibold'>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className='overflow-visible py-5'>
        {
          restaurants.map((restaurant, idx) => {
            return (
              <RestaurantCard item={restaurant} key={idx}></RestaurantCard>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default FeaturedRow