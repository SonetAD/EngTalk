import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import { Pressable } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const FollowHeaderComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.talkBuddiesWrapper}>
        <Pressable onPress={() => router.back()}>
          <CustomBrightIcon name='arrow-back-outline' />
        </Pressable>
        <Text style={styles.talkBuddies}>talk buddies</Text>
      </View>
    </View>
  );
};

export default FollowHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },
  talkBuddiesWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  talkBuddies: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
});
