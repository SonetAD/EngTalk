import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Error from '@/components/Error';
import CustomStatusBar from '@/components/CustomStatusBar';
import { Provider } from 'react-redux';
import Store from '@/redux/store/store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  if (!fontsLoaded && !error) {
    return <Error />;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Provider store={Store}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='(auth)' />
            <Stack.Screen name='index' />
          </Stack>
          <CustomStatusBar />
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
