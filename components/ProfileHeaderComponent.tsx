import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';

interface Props {
  userName: string;
  otherUser?: boolean;
}

const ProfileHeaderComponent = ({ userName, otherUser }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{userName}</Text>
      {!otherUser && <CustomBrightIcon name='settings-outline' />}
    </View>
  );
};

export default ProfileHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },
  userName: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
});
