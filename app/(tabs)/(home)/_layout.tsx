import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Home' />
      <Stack.Screen name='Call' />
    </Stack>
  );
};

export default HomeLayout;
