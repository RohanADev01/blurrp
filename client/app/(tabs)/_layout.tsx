import React from 'react';
import Navigation from '../../navigation';
import { PaperProvider } from 'react-native-paper';

export default function TabLayout() {
  return (
    <>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </>
  );
}
