import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Signup' />
      <Stack.Screen name='Signin' />
    </Stack>
  );
};

export default AuthLayout;
