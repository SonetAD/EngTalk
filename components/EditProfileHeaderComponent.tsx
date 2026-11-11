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
import ErrorAlert from './ErrorAlert';

const EditProfileHeaderComponent = () => {
  const {
    token,
    userId,
    userName,
    name,
    avatar,
    email,
    password,
    setUpdateProfile,
    setUser,
  } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      userId: state.user.userInfo.userId,
      userName: state.updateProfile.userName,
      name: state.updateProfile.name,
      email: state.updateProfile.email,
      avatar: state.updateProfile.avatar,
      password: state.updateProfile.password,
      setUpdateProfile: state.setUpdateProfile,
      setUser: state.setUser,
    }))
  );

  const [loading, setLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const saveUpdate = async () => {
    try {
      setLoading(true);
      await updateProfile({
        token,
        userId,
        userName,
        name,
        email,
        avatar,
        password,
      });

      if (userName) {
        LocalStore.set('userName', userName);
      }
      if (password) {
        LocalStore.set('passWord', password);
      }
      setUpdateProfile({
        userName: '',
        name: '',
        email: '',
        avatar: {
          src: '',
          stockAvatar: '',
        },
        password: '',
      });

      setLoading(false);

      router.navigate('/Profile');
    } catch (err) {
      setErrorMessage((err as Error).message);
      setShowErrorAlert(true);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.editProfileWrapper}>
        <Pressable onPress={() => router.back()}>
          <CustomBrightIcon name='arrow-back-outline' />
        </Pressable>
        <Text style={styles.editProfile}>edit profile</Text>
      </View>

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
      <ErrorAlert
        message={errorMessage}
        visibility={showErrorAlert}
        setVisibility={setShowErrorAlert}
      />
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
  editProfileWrapper: {
    flexDirection: 'row',
    gap: 10,
  },

  editProfile: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
});
