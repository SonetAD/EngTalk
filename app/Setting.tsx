import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import FullScreenView from '@/components/FullScreenView';
import { Color, Font } from '@/constants/constants';
import LocalStore from '@/libs/localStore';
import { router } from 'expo-router';
import * as Application from 'expo-application';
import deleteUser from '@/libs/api/deleteUser';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import CustomModal from '@/components/CustomModal';
import FormField from '@/components/FormField';
import openLink from '@/libs/openLink';
import { Share } from 'react-native';

const Setting = () => {
  const { token } = useCentralStore(
    useShallow((state) => ({ token: state.user.token }))
  );

  const [logoutPopUp, setLogoutPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [enableDeleteBtn, setEnableBtn] = useState(false);
  const [deleteInProgress, setDeleteIngInProgress] = useState(false);
  const passwordRef = useRef(LocalStore.getString('passWord'));

  const logoutHandler = () => {
    LocalStore.clearAll();
    router.replace('/Signin');
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          'I’m practicing English on EngTalk with real people — join me: https://play.google.com/store/apps/details?id=com.sonetadhikary.engtalk',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const userDelete = async () => {
    setDeleteIngInProgress(true);
    await deleteUser({ token });
    setDeleteIngInProgress(false);
    setDeletePopUp(false);
    logoutHandler();
  };

  return (
    <FullScreenView>
      <View style={styles.container}>
        <View>
          <Pressable
            onPress={() => openLink('https://engtalk.sonetstudio.org')}
            style={styles.card}
          >
            <Ionicons
              name='information-circle-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>About Us</Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={handleShare}
          >
            <Ionicons
              name='share-social-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>Share</Text>
          </Pressable>

          <Pressable
            onPress={() => openLink('sonet.ad101@gmail.com')}
            style={styles.card}
          >
            <Ionicons
              name='chatbubble-ellipses-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>Feedback</Text>
          </Pressable>
          <Pressable
            onPress={() => openLink('https://engtalk-privacy.sonetstudio.org/')}
            style={styles.card}
          >
            <Ionicons
              name='shield-checkmark-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>Privacy</Text>
          </Pressable>

          <Pressable
            onPress={() => setLogoutPopUp(true)}
            style={styles.card}
          >
            <Ionicons
              name='log-out-outline'
              size={22}
              color={Color.red}
            />
            <Text style={[styles.text, { color: Color.red }]}>Log Out</Text>
          </Pressable>
          <Pressable
            onPress={() => setDeletePopUp(true)}
            style={styles.card}
          >
            <Ionicons
              name='warning-outline'
              size={22}
              color={Color.red}
            />
            <Text style={[styles.text, { color: Color.red }]}>
              Delete Account
            </Text>
          </Pressable>
        </View>
        <View style={styles.footer}>
          <Text
            style={styles.footerText}
          >{`v ${Application.nativeApplicationVersion}`}</Text>
          <Text style={styles.footerText}>© 2025 Sonet Adhikary</Text>
        </View>
        <CustomModal
          isVisible={logoutPopUp}
          setVisibility={setLogoutPopUp}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalText}>Do you really want to log out?</Text>
            <Pressable
              onPress={logoutHandler}
              style={styles.modalBtn}
            >
              <Text style={styles.modalBtnText}>Log Out</Text>
            </Pressable>
          </View>
        </CustomModal>
        <CustomModal
          isVisible={deletePopUp}
          setVisibility={setDeletePopUp}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalText}>
              This will permanently delete your account and data. Continue
            </Text>
            <FormField
              value={passwordInput}
              onChangeText={(text: string) => {
                setPasswordInput(text);
                if (text === passwordRef.current) {
                  setEnableBtn(true);
                } else {
                  setEnableBtn(false);
                }
              }}
              placeholder='password'
              containerStyle={styles.passwordInput}
            />
            <Pressable
              onPress={userDelete}
              style={[
                styles.modalBtn,
                !enableDeleteBtn && { backgroundColor: Color.white },
              ]}
              disabled={!enableDeleteBtn}
            >
              {deleteInProgress ? (
                <ActivityIndicator
                  size='small'
                  color={Color.white}
                />
              ) : (
                <Text
                  style={[
                    styles.modalBtnText,
                    !enableDeleteBtn && { color: Color.red },
                  ]}
                >
                  Delete Account
                </Text>
              )}
            </Pressable>
          </View>
        </CustomModal>
      </View>
    </FullScreenView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Color.black.twoHundred,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  text: {
    color: Color.white,
    fontSize: 16,
    fontFamily: Font.pRegular,
  },
  footer: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    color: Color.gray.oneHundred,
    fontSize: 13,
    fontFamily: Font.pLight,
  },
  modalContent: {
    backgroundColor: Color.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: Color.red,
    fontFamily: Font.pSemiBold,
  },
  modalBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: Color.red,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.red,
  },
  modalBtnText: {
    color: Color.white,
    fontFamily: Font.pRegular,
  },
  modalText: {
    fontFamily: Font.pRegular,
    textAlign: 'center',
  },
  passwordInput: {
    width: '100%',
  },
});
