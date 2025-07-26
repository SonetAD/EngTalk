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
  Linking,
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
import createAccount from '@/libs/api/createAccount';
import { Ionicons } from '@expo/vector-icons';
import LocalStore from '@/libs/localStore';
import Checkbox from 'expo-checkbox';
import CustomModal from '@/components/CustomModal';
import PasswordValidationRules from '@/components/PasswordValidationRules';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    passWord: '',
    tos: false,
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
    if (!formData.tos) {
      setErrorMessage('Please accept terms and conditions');
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
                Your voice matters. Let’s start your English journey!
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
                containerStyle={{ marginTop: 15 }}
              />

              <PasswordValidationRules password={formData.passWord} />

              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={formData.tos}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tos: value })
                  }
                  color={formData.tos ? Color.secondary.oneHundred : undefined}
                  style={styles.checkbox}
                />
                <View style={styles.checkboxTextContainer}>
                  <Text style={styles.checkboxLabel}>I agree to the </Text>
                  <Pressable
                    onPress={() =>
                      Linking.openURL('https://engtalk.sonetstudio.org/tos')
                    }
                  >
                    <Text style={styles.link}>Terms of Service</Text>
                  </Pressable>
                </View>
              </View>

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
                  Log In
                </Link>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: DeviceWidth * 0.8,
    alignSelf: 'center',
  },
  checkbox: {
    marginRight: 10,
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Color.secondary.oneHundred,
  },
  checkboxTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
  },
  checkboxLabel: {
    color: Color.white,
    fontFamily: Font.pRegular,
    fontSize: 13,
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
