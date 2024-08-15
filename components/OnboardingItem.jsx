import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { Video } from 'expo-av';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Paginator from '../components/Paginator';
import OnboardingSlides from '@/OnboardingSlides';
import { styled } from 'nativewind';

const StyledButton = styled(TouchableOpacity);

const TypingEffect = ({ text, className, style, speed = 80, typingTextSetter = null }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let currText = '';
    let index = 0;

    if (typingTextSetter) {
      typingTextSetter(true);
    }

    const timer = setInterval(() => {
      currText += text[index];
      setDisplayedText(currText);
      index++;

      if (index === text.length) {
        clearInterval(timer);

        setTimeout(() => {
          if (typingTextSetter) {
            typingTextSetter(false);
          };

          setTypingComplete(true);
        }, 500);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  useEffect(() => {
    if (!typingComplete) {
      const cursorTimer = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, speed); // Blink cursor every speed ms

      return () => clearInterval(cursorTimer);
    } else {
      setShowCursor(false); // Hide cursor when typing is complete
    }
  }, [typingComplete]);

  return (
    <>
      <Text className={className} style={style}>
        {/* {displayedText} {showCursor && !typingComplete ? "|" : " "} */}
        {displayedText}
      </Text>
      {/* {showCursor && <Text className={className} style={style}>|</Text>} */}
    </>
  );
};

const OnboardingItem = ({ item, scrollX, totalItems }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [isTypingText, setIsTypingText] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const loadVideo = useCallback(async () => {
    try {
      if (videoRef1.current) {
        const status = await videoRef1.current.loadAsync(
          require('../assets/videos/TourVid1.mp4'),
          { shouldPlay: true, isLooping: true }
        );
        if (status.isLoaded) {
          setIsVideoLoaded(true);
        }
      } else if (videoRef2.current) {
        const status = await videoRef2.current.loadAsync(
          require('../assets/videos/TourVid2.mp4'),
          { shouldPlay: true, isLooping: true }
        );
        if (status.isLoaded) {
          setIsVideoLoaded(true);
        }
      }
    } catch (error) {
      console.error('Error loading video:', error);
    }
  }, []);

  const unloadVideo = useCallback(async () => {
    try {
      if (videoRef1.current) {
        await videoRef1.current.unloadAsync();
        setIsVideoLoaded(false);
      } else if (videoRef2.current) {
        await videoRef2.current.unloadAsync();
        setIsVideoLoaded(false);
      }
    } catch (error) {
      console.error('Error unloading video:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadDelay = setTimeout(() => {
        loadVideo();
      }, 10); // Adding a delay to ensure video has unloaded

      return () => {
        clearTimeout(loadDelay); // Clear any pending timeouts
        unloadVideo();
      };
    }, [loadVideo, unloadVideo])
  );

  useFocusEffect(
    useCallback(() => {
      // Load the video when the screen gains focus
      loadVideo();

      return () => {
        // Unload the video when the screen loses focus
        unloadVideo();
      };
    }, [loadVideo, unloadVideo])
  );

  useEffect(() => {
    if (!isTypingText) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isTypingText, fadeAnim]);

  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', }}>
      {item.id === totalItems && <ImageBackground
        source={require('../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />}
      <View className='relative p-0 mt-0' style={[styles.container, { width }]}>
        {item.id === 1 && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'black' }}
            className='absolute z-50 rounded-full p-1 shadow top-12 left-4'
          >
            <Icon.ArrowLeft strokeWidth={3} stroke='white' />
          </TouchableOpacity>
        )}
        {/* Image or Video */}
        {item.id !== totalItems && item.type === 'image' ? (
          <Image source={item.url} style={styles.image} resizeMode='cover' />
        ) : item.id !== totalItems && (
          <Video
            ref={item.videoId === 1 ? videoRef1 : videoRef2}
            source={item.url}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode='cover' // Use 'cover' to fill the screen and maintain aspect ratio
            shouldPlay
            isLooping
            style={styles.video}
            useNativeControls={false} // Disable native controls
          />
        )}

        {/* Text Container */}
        <View style={styles.textContainer}>
          {item.title !== '' &&
            (item.id === 1 ? (
              isVideoLoaded && (
                // <TypingEffect
                //   text={item.title}
                //   className='text-white pt-6 font-bold text-center'
                //   style={{ fontFamily: 'LondrinaSolid-Regular', fontSize: 29 }}
                //   typingTextSetter={setIsTypingText}
                // />
                <Animated.Text
                  className='text-white pt-6 font-bold text-center'
                  style={{ fontFamily: 'LondrinaSolid-Regular', fontSize: 29, opacity: fadeAnim }}
                >{item.title}</Animated.Text>
              )
            ) : (
              <Text
                className='text-white pt-6 font-bold text-center'
                style={{ fontFamily: 'LondrinaSolid-Regular', fontSize: 29 }}
              >
                {item.title}
              </Text>
            ))}
          {item.description !== '' && (
            item.id !== 1 ? (
              <Text
                className='text-white font-regular mt-6 tracking-widest text-center'
                style={{ fontFamily: 'Inter', fontSize: 14 }}
              >
                {item.description}
              </Text>) : (
              !isTypingText && (
                // < TypingEffect text={item.description}
                //   className='text-white font-regular mt-6 tracking-widest text-center'
                //   style={{ fontFamily: 'Inter', fontSize: 14 }} />)
                <Animated.Text
                  className='text-white font-regular mt-6 tracking-widest text-center'
                  style={{ fontFamily: 'Inter', fontSize: 14, opacity: fadeAnim }} >{item.description}</Animated.Text>)
            )
          )}

          {/* Button to Get Started */}
          {item.id === totalItems && (
            <>
              <StyledButton
                onPress={() => navigation.navigate('Login')}
                className='bg-[#fff] px-5 py-3 rounded-xl mt-12'
                activeOpacity={0.8}
              >
                <Text
                  className='text-black text-center text-lg font-semibold'
                  style={{ fontFamily: 'Roboto', fontSize: 14 }}
                >
                  Get Started
                </Text>
              </StyledButton>
            </>
          )}
        </View>
        {item.id !== totalItems && (<Paginator data={OnboardingSlides} scrollX={scrollX} />)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 0.6,
    width: '100%',
    height: '70%',
    borderRadius: 20,
  },
  video: {
    flex: 0.6,
    width: '100%',
    height: '70%',
    borderRadius: 20,
  },
  textContainer: {
    flex: 0.3, // Takes up 30% of the space
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 18,
    paddingHorizontal: 40,
  },
  backgroundImg: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: 0.8, zIndex: -5
  },
});

export default OnboardingItem;
