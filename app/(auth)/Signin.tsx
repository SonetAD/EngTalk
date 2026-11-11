import {
  StyleSheet,
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import Color from '@/constants/color';
import Font from '@/constants/font';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import userLogin from '@/libs/api/userLogin';
import LocalStore from '@/libs/localStore';
import CustomModal from '@/components/CustomModal';

const Signin = () => {
  const [formData, setFormData] = useState({
    userName: '',
    passWord: '',
  });
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.userName || !formData.passWord) {
      setErrorMessage('Please enter userName and password');
      setShowErrorAlert(true);
      return;
    }

    try {
      setIsLoading(true);
      await userLogin({
        userName: formData.userName,
        password: formData.passWord,
      });

      LocalStore.set('userName', formData.userName);
      LocalStore.set('passWord', formData.passWord);

      router.replace('/');
    } catch (err) {
      setErrorMessage((err as Error).message);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };
  const retry = () => {
    setShowErrorAlert(false);
    setErrorMessage('');
  };

  return (
    <FullScreenView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <Ionicons
              name='person-circle'
              size={40}
              color={Color.white}
            />
            <Text style={styles.heading}>
              Welcome back. Everyone’s been missing you!
            </Text>
            <FormField
              placeholder='email / username'
              value={formData.userName}
              onChangeText={(text) =>
                setFormData({ ...formData, userName: text })
              }
              keyboardType='email-address'
            />
            <FormField
              placeholder='password'
              value={formData.passWord}
              onChangeText={(text) =>
                setFormData({ ...formData, passWord: text })
              }
            />
            <CustomButton
              text='Log In'
              isLoading={isLoading}
              handlePress={handleSubmit}
            />
            <View style={styles.signUp}>
              <Text style={styles.txt}>Don't have an account? </Text>
              <Link
                href='/Signup'
                style={styles.link}
              >
                Sign Up
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <ErrorAlert
        message={errorMessage}
        visibility={showErrorAlert}
        setVisibility={setShowErrorAlert}
      /> */}
      <CustomModal
        isVisible={showErrorAlert}
        setVisibility={setShowErrorAlert}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Error!</Text>
          <Text style={styles.modalText}>{errorMessage}</Text>
          <Pressable
            onPress={retry}
            style={styles.modalBtn}
          >
            <Text>Ok</Text>
          </Pressable>
        </View>
      </CustomModal>
    </FullScreenView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  heading: {
    color: Color.gray.oneHundred,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: Font.pRegular,
    fontSize: 13,
    width: DeviceWidth * 0.8,
  },
  signUp: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: Font.pRegular,
    color: Color.white,
    textAlign: 'center',
    fontSize: 13,
  },
  link: {
    fontFamily: Font.pBold,
    color: Color.secondary.oneHundred,
  },
  modalContent: {
    backgroundColor: Color.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  modalTitle: {
    fontFamily: Font.pSemiBold,
    color: Color.red,
  },
  modalText: {
    fontFamily: Font.pRegular,
    textAlign: 'center',
  },
  modalBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: Color.gray.oneHundred,
    fontFamily: Font.pBold,
    borderRadius: 10,
  },
});
