import { View, Text, StyleSheet, FlatList, Animated, useWindowDimensions, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';

import OnboardingSlides from '../OnboardingSlides';
import OnboardingItem from '../components/OnboardingItem';

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // When tapping left or right half of the screen
  const { width } = useWindowDimensions();

  const handleNext = () => {
    if (currentIndex < OnboardingSlides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={OnboardingSlides}
        renderItem={({ item }) => <OnboardingItem item={item} scrollX={scrollX} totalItems={OnboardingSlides.length} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        horizontal
        bounces={false}
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig} // Important to include this to control how viewability is determined
        ref={slidesRef}
      />
      {/* Navigate by tapping left or right half of the screen */}
      {/* <TouchableOpacity style={[styles.touchableArea, styles.leftArea, { width: width / 6 }]} onPress={handlePrev} />
      <TouchableOpacity style={[styles.touchableArea, styles.rightArea, { width: width / 6 }]} onPress={handleNext} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  touchableArea: {
    position: 'absolute',
    top: 200,
    bottom: 0,
    zIndex: 0,
    backgroundColor: 'black',
    opacity: 0.2,
  },
  leftArea: {
    left: 0,
  },
  rightArea: {
    right: 0,
  },
});

export default OnboardingScreen;
