import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { themeColors } from '@/theme';

const CenteredView = styled(View);
const StyledButton = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledDiv = styled(TouchableOpacity);

const LoginScreen = () => {
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const navigation = useNavigation();

  const { width } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ImageBackground
        source={require('../../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />

      <SafeAreaView className='flex-1 justify-start items-center pt-10'>
        <Image
          source={require('../../assets/images/MascotLogoCropped1.png')}
          style={{ width: '50%', height: undefined, aspectRatio: 1 }}
          resizeMode='contain'
          className='mt-2'
        />
        <Text
          className='text-white mt-2 text-center'
          style={{ fontFamily: 'LondrinaSolid-Regular', fontSize: 28 }}
        >
          Blurrp
        </Text>
        <Text
          className='text-white font-bold mt-6 tracking-widest text-center'
          style={{ fontFamily: 'Inter', fontSize: 20 }}
        >
          Login To Your Account
        </Text>
        <View className='flex-col gap-2 items-start mt-4'>
          <StyledTextInput
            placeholder='Email'
            placeholderTextColor={themeColors.lightGrayText}
            style={[
              styles.input,
              { width: width * 0.8 },
              { borderColor: themeColors.lightGrayText },
            ]}
          />
          <StyledTextInput
            placeholder='Password'
            placeholderTextColor={themeColors.lightGrayText}
            style={[
              styles.input,
              { width: width * 0.8 },
              { borderColor: themeColors.lightGrayText },
            ]}
          />
        </View>

        <Text
          className='text-white font-bold mt-4 tracking-regular'
          style={{ fontFamily: 'Inter', fontSize: 14 }}
        >
          Or Continue With
        </Text>

        {/* Alternate login options */}
        <View className='flex-row gap-2 items-start mt-2'>
          <StyledDiv
            placeholder='Email'
            placeholderTextColor={themeColors.lightGrayText}
            style={[
              styles.input,
              { width: width * 0.35 },
              { borderColor: themeColors.lightGrayText },
            ]}
          >
            <View className='flex-row gap-2 items-center justify-center'>
              <Image
                source={require('../../assets/images/FacebookIcon.png')}
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
              ></Image>
              <Text
                className='text-black font-medium text-center'
                style={{ fontFamily: 'Inter', fontSize: 14 }}
              >
                Facebook
              </Text>
            </View>
          </StyledDiv>
          <StyledDiv
            placeholder='Password'
            placeholderTextColor={themeColors.lightGrayText}
            style={[
              styles.input,
              { width: width * 0.35 },
              { borderColor: themeColors.lightGrayText },
            ]}
          >
            <View className='flex-row gap-2 items-center justify-center'>
              <Image
                source={require('../../assets/images/GoogleIcon.png')}
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
              ></Image>
              <Text
                className='text-black font-medium text-center'
                style={{ fontFamily: 'Inter', fontSize: 14 }}
              >
                Google
              </Text>
            </View>
          </StyledDiv>
        </View>

        <CenteredView>
          <TouchableOpacity>
            <Text
              className='font-medium underline mt-2 text-center'
              style={{
                fontFamily: 'Inter',
                fontSize: 14,
                color: themeColors.text,
              }}
            >
              Forgot Your Password?
            </Text>
          </TouchableOpacity>
        </CenteredView>

        <StyledButton
          onPress={() => navigation.navigate('ChefHomeScreen')}
          className='bg-[#FA330C] mt-4 px-5 py-3 rounded-xl'
          activeOpacity={0.8}
        >
          <Text
            className='text-white text-center text-lg font-semibold'
            style={{ fontFamily: 'Roboto', fontSize: 14, width: width * 0.35 }}
          >
            Login
          </Text>
        </StyledButton>

        <CenteredView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            <Text
              className='font-medium underline mt-4 text-center'
              style={{
                fontFamily: 'Inter',
                fontSize: 14,
                color: themeColors.text,
              }}
            >
              don't have an account?
            </Text>
          </TouchableOpacity>
        </CenteredView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: -5,
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
});

export default LoginScreen;
