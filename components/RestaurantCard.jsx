// import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
// import React from 'react'
// import * as Icon from 'react-native-feather'
// import { themeColors } from '@/theme'
// import { useNavigation } from '@react-navigation/native'
// import { roundToNearestHalf } from '../helpers/index'

// const RestaurantCard = ({ item }) => {
//   const navigation = useNavigation();
//   const numFullStars = Math.floor(roundToNearestHalf(item.stars))
//   const numHalfStars = Math.ceil(roundToNearestHalf(item.stars) - Math.floor(roundToNearestHalf(item.stars)))
//   const numEmptyStars = 5 - (numFullStars + numHalfStars)

//   return (
//     <View>
//       <TouchableWithoutFeedback onPress={() => navigation.navigate('Restaurant', { ...item })}>
//         <View style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }} className='mr-6 bg-white rounded-3xl shadow-lg'>
//           <Image className='h-36 w-64 rounded-t-3xl' source={item.image} />
//           <View className='px-3 pb-4 space-y-2'>
//             <Text className='text-lg font-bold pt-2'>{item.name}</Text>
//             <View className='flex-row items-center space-x-1'>
//               <Text className='text-xs'>
//                 <Text className='font-semibold text-gray-700'>{item.stars}</Text>
//               </Text>
//               {Array.apply(null, { length: numFullStars }).map((_, idx) => <Image key={idx} source={require('../assets/images/fullStar.png')} className='h-4 w-4' />)}
//               {Array.apply(null, { length: numHalfStars }).map((_, idx) => <Image key={idx} source={require('../assets/images/halfStar.png')} className='h-4 w-4' />)}
//               {Array.apply(null, { length: numEmptyStars }).map((_, idx) => <Image key={idx} source={require('../assets/images/emptyStar.png')} className='h-4 w-4' />)}
//               <Text className='text-xs'>
//                 <Text className='text-gray-700'>({item.ratings} ratings)</Text>
//               </Text>
//             </View>
//             <View className='flex-row items-center space-x-1'>
//               <Text className='text-xs'>
//                 <Text className='font-semibold'>{item.category}</Text>
//               </Text>
//             </View>
//             <View className='flex-row items-center space-x-1'>
//               <Icon.MapPin color='gray' width='15' height='15' />
//               <Text className='text-gray-700 text-xs'>{item.address}</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   )
// }

// export default RestaurantCard