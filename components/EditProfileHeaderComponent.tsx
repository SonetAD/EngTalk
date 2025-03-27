import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import updateProfile from '@/libs/api/updateProfile';
import { router } from 'expo-router';
import LocalStore from '@/libs/localStore';

const EditProfileHeaderComponent = () => {
  const { token, userName, name, avatar, email, password, setUser } =
    useCentralStore(
      useShallow((state) => ({
        token: state.user.token,
        userName: state.updateProfile.userName,
        name: state.updateProfile.name,
        email: state.updateProfile.email,
        avatar: state.updateProfile.avatar,
        password: state.updateProfile.password,
        setUser: state.setUser,
      }))
    );

  const [loading, setLoading] = useState(false);

  const saveUpdate = async () => {
    try {
      setLoading(true);
      await updateProfile({
        token,
        userName,
        name,
        email,
        avatar,
        password,
      });
      setLoading(false);

      if (userName) {
        LocalStore.set('userName', userName);
      }
      if (password) {
        LocalStore.set('passWord', password);
      }

      router.navigate('/Home');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.inbox}>edit profile</Text>
      <Pressable onPress={saveUpdate}>
        {loading ? (
          <ActivityIndicator
            size='small'
            color={Color.white}
          />
        ) : (
          <CustomBrightIcon name='checkmark-outline' />
        )}
      </Pressable>
    </View>
  );
};

export default EditProfileHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },
  inbox: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
});
