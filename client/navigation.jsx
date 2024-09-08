import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import OnboardingScreen from './screens/AppLaunch/OnboardingScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupBioScreen from './screens/Auth/SignupBioScreen';
import SignupLocationScreen from './screens/Auth/SignupLocationScreen';
import SignupMobileVerifScreen from './screens/Auth/SignupMobileVerifScreen';
import SignupProfileTypeScreen from './screens/Auth/SignupProfileTypeScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import SignupSuccessfulScreen from './screens/Auth/SignupSuccessfulScreen';
import ChefHomeScreen from './screens/Chef/Main/ChefHomeScreen';
import { supabaseSecureStore } from './utils/auth';
import { supabase } from './utils/supabase';

const Stack = createNativeStackNavigator();

function Navigation () {
  const [initialRoute, setInitialRoute] = useState('Onboarding');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      let session, profile, googleResponse;

      // Check supabaseSecureStore for session
      const secureStoreResponse = await supabaseSecureStore.auth.getSession();
      if (secureStoreResponse.data && secureStoreResponse.data.session) {
        session = secureStoreResponse.data.session;
      } else {
        // Check supabase for session (Google sign-in)
        googleResponse = await supabase.auth.getSession();
        if (googleResponse.data && googleResponse.data.session) {
          session = googleResponse.data.session;
        }
      }

      console.log('SecureStore: ', secureStoreResponse)
      console.log('GoogleStore: ', googleResponse)
      console.log('Session: ', session)

      if (session && session.user) {
        console.log('USER FOUND!!!', session.user)
        // Fetch the user's role from the profile table
        // const { data: userProfile } = await supabase
        //   .from('profiles')
        //   .select('role')
        //   .eq('id', session.user.id)
        //   .single();

        profile = userProfile;
        setInitialRoute('ChefHomeScreen');
      } else {
        console.log('No user found :(((', profile)
      }

      // if (profile && profile.role === 'chef') {
      // } else if (profile && profile.role === 'customer') {
      //   setInitialRoute('CustomerHomeScreen');
      // } else {
      //   setInitialRoute('Home');
      // }

      setLoading(false);
    };

    checkUserSession();
  }, []);

  if (loading) {
    // Optionally, return a loading screen while checking the session
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false, animationEnabled: false }}>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignupBio" component={SignupBioScreen} />
      <Stack.Screen name="SignupLocation" component={SignupLocationScreen} />
      <Stack.Screen name="SignupMobileVerif" component={SignupMobileVerifScreen} />
      <Stack.Screen name="SignupSuccessful" component={SignupSuccessfulScreen} />
      <Stack.Screen name="SignupProfileType" component={SignupProfileTypeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ChefHome" component={ChefHomeScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;