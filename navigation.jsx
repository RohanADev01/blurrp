import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TourScreen1 from './screens/TourScreen1';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupBioScreen from './screens/SignupBioScreen';
import SignupLocationScreen from './screens/SignupLocationScreen';
import SignupMobileVerifScreen from './screens/SignupMobileVerifScreen';
import SignupSuccessfulScreen from './screens/SignupSuccessfulScreen';
import SignupProfileTypeScreen from './screens/SignupProfileTypeScreen';
import ChefHomeScreen from './screens/ChefHomeScreen';

const Stack = createNativeStackNavigator();

function Navigation () {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tour1" component={TourScreen1} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignupBio" component={SignupBioScreen} />
      <Stack.Screen name="SignupLocation" component={SignupLocationScreen} />
      <Stack.Screen name="SignupMobileVerif" component={SignupMobileVerifScreen} />
      <Stack.Screen name="SignupSuccessful" component={SignupSuccessfulScreen} />
      <Stack.Screen name="SignupProfileType" component={SignupProfileTypeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ChefHomeScreen" component={ChefHomeScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;