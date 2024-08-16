import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';

const StyledDiv = styled(TouchableOpacity);

const ChefProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, City, Country',
  });

  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../../../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const handleInputChange = (field, value) => {
    setUserProfile({ ...userProfile, [field]: value });
  };

  const handleSaveChanges = () => {
    // Implement saving logic here
    alert('Profile updated successfully!');
  };

  return (
    <SafeAreaView className='flex-1 pt-10 p-16 bg-white'>
      <ImageBackground
        source={require('../../../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Back Button */}
          <StyledDiv
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            className='z-10 rounded-2xl p-4 shadow mt-8'
          >
            <Icon.ChevronLeft strokeWidth={4} stroke='white' />
          </StyledDiv>
          <Text
            className='text-black font-bold my-6 tracking-widest'
            style={[styles.text, { fontFamily: 'Inter', fontSize: 25 }]}
          >
            Profile Details
          </Text>

          {/* Profile Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={userProfile.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              editable={false}
              style={[styles.input, { color: themeColors.lightGrayText }]}
              value={userProfile.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType='email-address'
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              editable={false}
              style={[styles.input, { color: themeColors.lightGrayText }]}
              value={userProfile.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType='phone-pad'
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={userProfile.address}
              onChangeText={(text) => handleInputChange('address', text)}
              multiline
            />
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Update Details</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    paddingBottom: 40,
  },
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: -5,
  },
  backButton: {
    backgroundColor: themeColors.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    borderRadius: 20,
    padding: 10,
    marginTop: 16,
  },
  text: {
    paddingHorizontal: 0,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: themeColors.inactiveButton,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: themeColors.grayDisplayText,
    backgroundColor: themeColors.greyedButton,
  },
  saveButton: {
    backgroundColor: themeColors.button,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChefProfileScreen;
