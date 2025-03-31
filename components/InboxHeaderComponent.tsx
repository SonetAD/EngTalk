import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import { Pressable } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const InboxHeaderComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inboxWrapper}>
        <Pressable onPress={() => router.replace('/Home')}>
          <CustomBrightIcon name='arrow-back-outline' />
        </Pressable>
        <Text style={styles.inbox}>inbox</Text>
      </View>
    </View>
  );
};

export default InboxHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },
  inboxWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  inbox: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
});
