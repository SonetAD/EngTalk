import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import Color from '@/constants/color';
import Font from '@/constants/font';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import GenderSelection from '@/components/GenderSelection';
import ErrorAlert from '@/components/ErrorAlert';
import createAccount from '@/libs/api/createAccount';
import { Ionicons } from '@expo/vector-icons';
import LocalStore from '@/libs/localStore';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    passWord: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.passWord ||
      !formData.gender
    ) {
      setErrorMessage('Please fill all the fields');
      setShowErrorAlert(true);
      return;
    }

    try {
      setIsLoading(true);
      await createAccount({
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        password: formData.passWord,
      });

      LocalStore.set('userName', formData.email);
      LocalStore.set('passWord', formData.passWord);

      router.replace('/');
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.message);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FullScreenView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.main}>
              <Ionicons
                name='person-circle-outline'
                size={40}
                color={Color.white}
              />

              <Text style={styles.heading}>
                New here? The world is waiting to hear your voice!
              </Text>

              <FormField
                placeholder='name'
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
              <FormField
                placeholder='email'
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
              <GenderSelection
                gender={formData.gender}
                setGender={(selectedGender: string) =>
                  setFormData({ ...formData, gender: selectedGender })
                }
              />
              <FormField
                placeholder='password'
                value={formData.passWord}
                onChangeText={(text) =>
                  setFormData({ ...formData, passWord: text })
                }
              />

              <CustomButton
                text='Sign Up'
                isLoading={isLoading}
                handlePress={handleSubmit}
              />

              <View style={styles.signIn}>
                <Text style={styles.txt}>Already have an account? </Text>
                <Link
                  href='/Signin'
                  style={styles.link}
                >
                  Sign In
                </Link>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <ErrorAlert
        visibility={showErrorAlert}
        setVisibility={setShowErrorAlert}
        message={errorMessage}
      />
    </FullScreenView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  main: {
    width: DeviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: Color.gray.oneHundred,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: Font.pRegular,
    fontSize: 13,
    width: DeviceWidth * 0.8,
  },
  signIn: {
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
});
