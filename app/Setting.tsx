import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import FullScreenView from '@/components/FullScreenView';
import Color from '@/constants/color';
import Font from '@/constants/font';

const Setting = () => {
  return (
    <FullScreenView>
      <View style={styles.container}>
        <View>
          <View style={styles.card}>
            <Ionicons
              name='information-circle-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>About Us</Text>
          </View>

          <View style={styles.card}>
            <Ionicons
              name='share-social-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>Share</Text>
          </View>

          <View style={styles.card}>
            <Ionicons
              name='chatbubble-ellipses-outline'
              size={22}
              color={Color.white}
            />
            <Text style={styles.text}>Feedback</Text>
          </View>

          {/* Log Out */}
          <View style={styles.card}>
            <Ionicons
              name='log-out-outline'
              size={22}
              color={Color.red}
            />
            <Text style={[styles.text, { color: Color.red }]}>Log Out</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>v1.0.0</Text>
          <Text style={styles.footerText}>© 2025 Sonet Studio</Text>
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
