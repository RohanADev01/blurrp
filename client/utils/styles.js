// utils/styles.js
import { StyleSheet, Platform } from 'react-native';

const createStyles = (styles) => {
  const baseStyles = StyleSheet.create(styles);
  if (Platform.OS === 'android') {
    Object.keys(baseStyles).forEach(key => {
      if (baseStyles[key].fontSize) {
        baseStyles[key].fontSize += 2; // Increase font size by 2 units on Android
      }
    });
  }
  return baseStyles;
};

export default createStyles;