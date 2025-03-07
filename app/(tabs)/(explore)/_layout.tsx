import { Stack } from 'expo-router';

const ExploreLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='Explore'>
      <Stack.Screen name='Explore' />
    </Stack>
  );
};

export default ExploreLayout;
