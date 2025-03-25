import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import { Pressable } from 'react-native-gesture-handler';
import { router } from 'expo-router';

interface Props {
  userName: string;
  otherUser?: boolean;
}

const ProfileHeaderComponent = ({ userName, otherUser }: Props) => {
  const editProfile=()=>{
    router.push('/EditProfile');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{userName}</Text>
      {!otherUser && (
        <Pressable onPress={editProfile}>
          <CustomBrightIcon name='settings-outline' />
        </Pressable>
      )}
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
