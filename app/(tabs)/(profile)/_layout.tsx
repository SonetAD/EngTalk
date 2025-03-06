import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack
      initialRouteName='Profile'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Profile' />
    </Stack>
  );
};

export default ProfileLayout;
