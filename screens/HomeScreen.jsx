import {
  View,
  ImageBackground,
  Text,
  Switch,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Icon from 'react-native-feather';
import { themeColors } from '../theme/index';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import { featured } from '../constants/index';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const CenteredView = styled(View);
const StyledButton = styled(TouchableOpacity);

export default function HomeScreen () {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', }}>
      <ImageBackground
        source={require('../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />
      <CenteredView className='flex-1 justify-center items-center pt-10'>
        <Image
          source={require('../assets/images/MascotLogoCropped1.png')}
          style={{ width: '65%', height: undefined, aspectRatio: 1 }}
          resizeMode='contain'
        />
        <Text
          className='text-white mt-4 text-center'
          style={{ fontFamily: 'LondrinaSolid-Regular', fontSize: 41, paddingHorizontal: 40 }}
        >
          Blurrp
        </Text>
        <Text
          className='text-white font-bold mt-4 tracking-widest text-center'
          style={{ fontFamily: 'Inter', fontSize: 13, paddingHorizontal: 40 }}
        >
          Discover Your Favourite Food
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          style={{ backgroundColor: 'white' }}
          className='z-10 rounded-lg p-4 shadow mt-8'
        >
          <Icon.ArrowRight strokeWidth={4} stroke='black' />
        </TouchableOpacity>
        {/* <StyledButton
          onPress={() => navigation.navigate('Onboarding')}
          className='bg-[#FA330C] mt-12 px-5 py-3 rounded-xl'
          activeOpacity={0.8}
        >
          <Text
            className='text-white text-center text-lg font-semibold'
            style={{ fontFamily: 'Roboto', fontSize: 14 }}
          >
          </Text>
        </StyledButton> */}
      </CenteredView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: 0.8, zIndex: -5
  },
})