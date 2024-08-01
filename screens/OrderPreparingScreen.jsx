import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderPreparingScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      // Move to delivery screen
      navigation.navigate('Delivery')
    }, 4500)
  }, [])

  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <Image source={require('../assets/images/deliveryBike.gif')} className='h-80 w-80' />
    </View>
  )
}

export default OrderPreparingScreen