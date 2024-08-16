import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/AppLaunch/HomeScreen';
import OnboardingScreen from './screens/AppLaunch/OnboardingScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import SignupBioScreen from './screens/Auth/SignupBioScreen';
import SignupLocationScreen from './screens/Auth/SignupLocationScreen';
import SignupMobileVerifScreen from './screens/Auth/SignupMobileVerifScreen';
import SignupSuccessfulScreen from './screens/Auth/SignupSuccessfulScreen';
import SignupProfileTypeScreen from './screens/Auth/SignupProfileTypeScreen';
import ChefHomeScreen from './screens/Chef/Main/ChefHomeScreen';

const Stack = createNativeStackNavigator();

function Navigation () {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
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