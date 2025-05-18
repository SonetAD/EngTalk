import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Error from '@/components/Error';
import CustomStatusBar from '@/components/CustomStatusBar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatHeaderComponent from '@/components/ChatHeaderComponent';
import InboxHeaderComponent from '@/components/InboxHeaderComponent';
import EditProfileHeaderComponent from '@/components/EditProfileHeaderComponent';
import FullScreenAvatarHeaderComponent from '@/components/FullScreenAvatarHeaderComponent';
import SearchUserHeaderComponent from '@/components/SearchUserHeaderComponent';
import SettingHeaderComponent from '@/components/SettingHeaderComponent';
import ConvertHeader from '@/components/ConvertSilverHeader';
import mobileAds from 'react-native-google-mobile-ads';

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

  useEffect(() => {
    mobileAds().initialize();
  }, []);

  if (!fontsLoaded) return null;

  if (!fontsLoaded && !error) {
    return <Error />;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName='index'
        >
          <Stack.Screen name='(auth)' />
          <Stack.Screen
            name='Chat'
            options={{
              header: ChatHeaderComponent,
              headerShown: true,
            }}
          />
          <Stack.Screen name='Call' />

          <Stack.Screen
            name='Inbox'
            options={{
              header: InboxHeaderComponent,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name='ConvertSilverCoinScreen'
            options={{
              header: ConvertHeader,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name='EditProfile'
            options={{
              header: EditProfileHeaderComponent,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name='Setting'
            options={{
              header: SettingHeaderComponent,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name='FullScreenAvatar'
            options={{
              header: FullScreenAvatarHeaderComponent,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name='SearchUser'
            options={{
              header: SearchUserHeaderComponent,
              headerShown: true,
            }}
          />

          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='index' />
        </Stack>
        <CustomStatusBar />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
