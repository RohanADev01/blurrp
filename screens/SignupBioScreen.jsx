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

const SignupBioScreen = () => {
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
        source={require('../assets/images/FoodItemsScreenBgCorner.png')}
        style={styles.backgroundImg}
      />

      <SafeAreaView className='flex-1 justify-between items-center pt-10 mb-20'>
        <View>
          <StyledDiv onPress={() => navigation.goBack()}
            style={{
              backgroundColor: themeColors.buttonBg,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
            }}
            className='z-10 rounded-2xl p-4 shadow mt-8 ml-8'
          >
            <Icon.ChevronLeft strokeWidth={4} stroke={themeColors.button} />
          </StyledDiv>
          <Text
            className='text-white font-bold mt-6 tracking-widest'
            style={[styles.text, { fontFamily: 'Inter', fontSize: 25 }]}
          >
            Fill in your bio to get started
          </Text>
          <Text
            className='text-white font-normal mt-4 tracking-regular'
            style={[styles.text, { fontFamily: 'Inter', fontSize: 12 }]}
          >
            This data will be displayed in your account profile for security
          </Text>
          <View className='flex-col gap-2 items-center justify-center mt-4'>
            <StyledTextInput
              placeholder='First Name'
              placeholderTextColor={themeColors.lightGrayText} // grey color for the placeholder
              style={[styles.input, { width: width * 0.8 }, { borderColor: themeColors.lightGrayText }]}
            />
            <StyledTextInput
              placeholder='Last Name'
              placeholderTextColor={themeColors.lightGrayText} // grey color for the placeholder
              style={[styles.input, { width: width * 0.8 }, { borderColor: themeColors.lightGrayText }]}
            />
            <StyledTextInput
              placeholder='Mobile Number'
              placeholderTextColor={themeColors.lightGrayText} // grey color for the placeholder
              style={[styles.input, { width: width * 0.8 }, { borderColor: themeColors.lightGrayText }]}
            />
          </View>
        </View>
        <StyledButton
          onPress={() => navigation.navigate('SignupMobileVerif')}
          className='bg-[#FA330C] mt-4 px-5 py-3 rounded-xl'
          activeOpacity={0.8}
        >
          <Text
            className='text-white text-center text-lg font-semibold'
            style={{ fontFamily: 'Roboto', fontSize: 14, width: width * 0.35 }}
          >
            Next
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

export default SignupBioScreen