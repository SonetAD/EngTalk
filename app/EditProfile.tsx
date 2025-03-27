import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import FormField from '@/components/FormField';
import CustomAvatar from '@/components/CustomAvatar';
import { Color, Font } from '@/constants/constants';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const {
    name,
    userName,
    email,
    avatar,
    updateUserName,
    updateName,
    updateEmail,
    updateProfileAvatar,
    updatePassword,
    setUpdateProfile,
  } = useCentralStore(
    useShallow((state) => ({
      name: state.user.userInfo.name,
      userName: state.user.userInfo.userName,
      email: state.user.userInfo.email,
      avatar: state.user.userInfo.avatar,
      updateUserName: state.updateProfile.userName,
      updateName: state.updateProfile.name,
      updateEmail: state.updateProfile.email,
      updateProfileAvatar: state.updateProfile.avatar,
      updatePassword: state.updateProfile.password,
      setUpdateProfile: state.setUpdateProfile,
    }))
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUpdateProfile({ avatar: result.assets[0].uri });
    }
  };

  return (
    <FullScreenView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
        style={styles.keyboardAvoiding}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Pressable onPress={pickImage}>
                  <CustomAvatar
                    avatar={updateProfileAvatar ? updateProfileAvatar : avatar}
                    customSrc={updateProfileAvatar ? true : false}
                  />
                </Pressable>
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.label}>Name</Text>
                <FormField
                  value={updateName || ''}
                  placeholder={name}
                  onChangeText={(text) => setUpdateProfile({ name: text })}
                />

                <Text style={styles.label}>Username</Text>
                <FormField
                  value={updateUserName || ''}
                  placeholder={userName}
                  onChangeText={(text) => setUpdateProfile({ userName: text })}
                />

                <Text style={styles.label}>Email</Text>
                <FormField
                  value={updateEmail || ''}
                  placeholder={email}
                  onChangeText={(text) => setUpdateProfile({ email: text })}
                  keyboardType='email-address'
                />

                <Text style={styles.label}>Password</Text>
                <FormField
                  value={updatePassword || ''}
                  placeholder='Password'
                  onChangeText={(text) => setUpdateProfile({ password: text })}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </FullScreenView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    color: Color.white,
    fontSize: 14,
    fontFamily: Font.pRegular,
    marginBottom: 6,
  },
});
