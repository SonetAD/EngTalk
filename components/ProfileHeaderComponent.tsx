import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import { Pressable } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';

interface Props {
  userName: string;
  otherUser?: boolean;
}

const ProfileHeaderComponent = ({ userName, otherUser }: Props) => {
  const { otherUserGoBackRoute } = useCentralStore(
    useShallow((state) => ({
      otherUserGoBackRoute: state.otherUserGoBackRoute,
    }))
  );
  const setting = () => {
    router.push('/Setting');
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        {otherUser && (
          <Pressable onPress={() => router.replace(otherUserGoBackRoute)}>
            <CustomBrightIcon name='arrow-back-outline' />
          </Pressable>
        )}
        <Text style={styles.userName}>{userName}</Text>
      </View>
      {!otherUser && (
        <Pressable onPress={setting}>
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
  profileWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
});
