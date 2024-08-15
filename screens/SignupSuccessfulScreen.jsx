import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';

const CenteredView = styled(View);
const StyledButton = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledDiv = styled(TouchableOpacity);

const SignupSuccessfulScreen = () => {
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const navigation = useNavigation();

  const { width } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, backgroundColor: 'black', }}>
      <ImageBackground
        source={require('../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />

      <SafeAreaView className='flex-1 justify-between items-center pt-10 mb-20'>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View className='flex-col items-center justify-center gap-4'>
            <Image
              source={require('../assets/images/successTick.png')}
              style={{ width: '50%', height: undefined, aspectRatio: 1 }}
              resizeMode='contain'
              className='mt-2'
            />
            <Text
              className='font-bold mt-6 tracking-widest text-center'
              style={[styles.text, { fontFamily: 'Inter', fontSize: 30, color: themeColors.primaryText }]}
            >
              Congrats!
            </Text>
            <Text
              className='text-white font-bold mt-6 tracking-widest text-center'
              style={[styles.text, { fontFamily: 'Inter', fontSize: 23 }]}
            >
              Your Profile Is Ready To Use
            </Text>
          </View>
        </View>
        <StyledButton
          onPress={() => navigation.navigate('SignupProfileType')}
          className='bg-[#FA330C] mt-4 px-5 py-3 rounded-xl'
          activeOpacity={0.8}
        >
          <Text
            className='text-white text-center text-lg font-semibold'
            style={{ fontFamily: 'Roboto', fontSize: 14, width: width * 0.35 }}
          >
            Go To Order
          </Text>
        </StyledButton>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: 0.8, zIndex: -5
  },
  text: {
    paddingHorizontal: 35,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // for Android shadow
    height: '10em',
  },
})

export default SignupSuccessfulScreen