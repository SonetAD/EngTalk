import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';

const HomeHeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>eng<Text style={styles.talk}>talk</Text></Text>
      <Ionicons
        name='chatbubble-ellipses-outline'
        size={20}
        color={Color.white}
      />
    </View>
  );
};

export default HomeHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  userName: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
  talk: {
    color: Color.secondary.twoHundred,
  },
});
