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
import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { themeColors } from '@/theme';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

import {
  EXPO_CLIENT_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  WEB_CLIENT_ID,
} from '../../constants/authCredentials';

WebBrowser.maybeCompleteAuthSession();

const CenteredView = styled(View);
const StyledButton = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledDiv = styled(TouchableOpacity);

const LoginScreen = () => {
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
  });

  // Re-render on change to response or token
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response, token]);

  // Helper function, check if user is already logged in
  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem('@user');
    if (!data) return null;
    return JSON.parse(data);
  };

  // Helper function, get user information by sending fetch request to Google API Endpoint
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Handle error
      alert('Could not sign in with Google. Try again later.');
      console.error(
        `Error signing in token: ${token}, error: ${error.message}.`
      );
    }
  };

  async function handleSignInWithGoogle () {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === 'success') {
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
    }
  }

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
            secureTextEntry={true}
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

        <Text className='text-white font-bold mt-4 tracking-regular'>
          {JSON.stringify(userInfo)}
        </Text>

        {/* Alternate login options */}
        <View className='flex-row gap-2 items-start mt-2'>
          <StyledDiv
            placeholder='Facebook'
            placeholderTextColor={themeColors.lightGrayText}
            style={[
              styles.input,
              { width: width * 0.35 },
              { borderColor: themeColors.lightGrayText },
            ]}
          >
            <TouchableOpacity
              className='flex-row gap-2 items-center justify-center'
              onPress={() => AsyncStorage.removeItem('@user')}
            >
              <Image
                source={require('../../assets/images/FacebookIcon.png')}
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
              ></Image>
              <Text
                className='text-black font-medium text-center'
                style={{ fontFamily: 'Inter', fontSize: 14 }}
              >
                DelLocalSto.
              </Text>
            </TouchableOpacity>
          </StyledDiv>
          <StyledDiv
            placeholder='Google'
            placeholderTextColor={themeColors.lightGrayText}
            style={[
              styles.input,
              { width: width * 0.35 },
              { borderColor: themeColors.lightGrayText },
            ]}
          >
            <TouchableOpacity
              className='flex-row gap-2 items-center justify-center'
              disabled={!request}
              onPress={() => promptAsync()}
            >
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
            </TouchableOpacity>
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
              Don't Have An Account?
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
