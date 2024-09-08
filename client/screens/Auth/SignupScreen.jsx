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
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { themeColors } from '@/theme';

import 'react-native-url-polyfill/auto';
import { supabaseSecureStore } from '../../utils/auth';
import GoogleAuthBtn from '../../components/Auth';

const CenteredView = styled(View);
const StyledButton = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail () {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabaseSecureStore.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session && !error)
      Alert.alert('Signup Successful!');
    setLoading(false);
  }

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
          source={require('../../assets/images/MascotLogoCropped.png')}
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
          Sign Up For Free
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
            onChangeText={(text) => setEmail(text)}
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
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        {/* Signup Button */}
        <StyledButton
          // onPress={() => signUpWithEmail()}
          onPress={() => navigation.navigate('SignupBio')}
          className='bg-[#FA330C] mt-4 px-3 py-2 rounded-xl'
          activeOpacity={0.8}
        >
          <Text
            className='text-white text-center text-lg font-semibold'
            style={{ fontFamily: 'Roboto', fontSize: 14, width: width * 0.35 }}
          >
            Signup
          </Text>
        </StyledButton>

        {/* Alternate signup options */}
        <Text
          className='text-white font-bold mt-4 tracking-regular'
          style={{ fontFamily: 'Inter', fontSize: 14 }}
        >
          Or Continue With
        </Text>

        <View className='flex-col gap-2 align-center justify-center mt-2'>
          <GoogleAuthBtn />
        </View>

        <CenteredView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <Text
              className='font-medium mt-4 text-center'
              style={{
                fontFamily: 'Inter',
                fontSize: 14,
                color: themeColors.text,
              }}
            >
              Already Have An Account?
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
    height: 50,
  },
});

export default SignupScreen;
