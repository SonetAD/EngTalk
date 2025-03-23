import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import { router } from 'expo-router';

const HomeHeaderComponent = () => {
  const openInbox = () => {
    router.navigate('/Inbox');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.eng}>
        eng<Text style={[styles.eng, styles.talk]}>talk</Text>
      </Text>
      <Pressable onPress={openInbox}>
        <CustomBrightIcon name='chatbubble-ellipses-outline' />
      </Pressable>
    </View>
  );
};

export default HomeHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },
  eng: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
  talk: {
    color: Color.secondary.twoHundred,
  },
});
