import { StyleSheet, Text, View, Pressable, Linking } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import FullScreenView from '@/components/FullScreenView';
import Color from '@/constants/color';
import Font from '@/constants/font';
import LocalStore from '@/libs/localStore';
import { router } from 'expo-router';
import * as Application from 'expo-application';

const Setting = () => {
  const logout = () => {
    LocalStore.clearAll();
    router.replace('/Signin');
  };
  const openAboutPage = () => {
    Linking.openURL('https://engtalk.sonetstudio.org').catch(() =>
      console.log('Unable to open settings')
    );
  };

  const openPrivacyPage = () => {
    Linking.openURL('https://engtalk-privacy.sonetstudio.org/').catch(() =>
      console.log('Unable to open settings')
    );
  };

  const openEmail = () => {
    const email = 'sonet.ad101@gmail.com';
    const url = `mailto:${email}`;

    Linking.openURL(url).catch(() => console.log('Unable to open email'));
  };

  return (
    <FullScreenView>
      <View style={styles.container}>
        <View>
          <Pressable
            onPress={openAboutPage}
            style={styles.card}
          >
            <Ionicons
              name='information-circle-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>About Us</Text>
          </Pressable>

          <View style={styles.card}>
            <Ionicons
              name='share-social-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>Share</Text>
          </View>

          <Pressable
            onPress={openEmail}
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
            onPress={openPrivacyPage}
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
            onPress={logout}
            style={styles.card}
          >
            <Ionicons
              name='log-out-outline'
              size={22}
              color={Color.red}
            />
            <Text style={[styles.text, { color: Color.red }]}>Log Out</Text>
          </Pressable>
        </View>
        <View style={styles.footer}>
          <Text
            style={styles.footerText}
          >{`v ${Application.nativeApplicationVersion}`}</Text>
          <Text style={styles.footerText}>© 2025 Sonet Adhikary</Text>
        </View>
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
});
