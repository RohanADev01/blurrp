import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av'

const TourScreen1 = () => {
  const { width, height } = Dimensions.get('window');

  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../assets/fonts/LondrinaSolid-Regular.ttf'),
    'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/TourVid1.mp4')} // Replace with your local video file path
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover" // Use 'cover' to fill the screen and maintain aspect ratio
        shouldPlay
        isLooping
        style={styles.video}
        useNativeControls={false} // Disable native controls
      />
      <Text className='text-white mt-8 font-bold' style={{ fontFamily: 'Robot', fontSize: 22 }}>Find Your Comfort</Text>
      <Text className='text-white mt-1 font-bold' style={{ fontFamily: 'Robot', fontSize: 22 }}>Food Here</Text>
      <Text className='text-white font-light mt-8 tracking-widest' style={{ fontFamily: 'Inter', fontSize: 13 }}>Here You Can find a chef or dish</Text>
      <Text className='text-white font-light mt-2 tracking-widest' style={{ fontFamily: 'Inter', fontSize: 13 }}>for every taste and color</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000', // Ensure the background is black or matches the video
  },
  video: {
    width: '100%',
    height: '60%',
  },
});

export default TourScreen1