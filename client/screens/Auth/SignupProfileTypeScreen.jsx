import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';

const StyledButton = styled(TouchableOpacity);
const StyledDiv = styled(TouchableOpacity);

const SignupProfileTypeScreen = () => {
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
        source={require('../../assets/images/FoodItemsScreenBgCorner.png')}
        style={styles.backgroundImg}
      />

      <SafeAreaView className='flex-1 justify-between items-center pt-10 mb-20'>
        <View style={{ width: '100%' }}>
          <StyledDiv
            onPress={() => navigation.goBack()}
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
            I am a ...
          </Text>
          <View style={styles.container}>
            <TouchableOpacity style={styles.box}>
              <Image
                source={require('../../assets/images/Sushi.png')}
                style={styles.image}
                resizeMode='contain'
              />
              <Text
                style={[styles.caption, { fontFamily: 'Inter', fontSize: 14 }]}
              >
                Foodie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('ChefHome')}
            >
              <Image
                source={require('../../assets/images/MascotLogoCropped1.png')}
                style={styles.image}
                resizeMode='contain'
              />
              <Text
                style={[styles.caption, { fontFamily: 'Inter', fontSize: 14 }]}
              >
                Chef
              </Text>
            </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.8,
    zIndex: -5,
  },
  text: {
    paddingHorizontal: 35,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    width: '40%',
    height: '60%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60, // Space inside the boxes
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Add elevation for Android shadow
  },
  image: {
    width: '80%',
    height: '60%',
  },
  caption: {
    marginTop: 15,
    fontSize: 16,
    color: 'black',
  },
});

export default SignupProfileTypeScreen;
