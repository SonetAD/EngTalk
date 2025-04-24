import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Font, Color, DeviceHeight, DeviceWidth } from '@/constants/constants';

interface Props {
  text: string;
}
const NoFollowFound = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default NoFollowFound;

const styles = StyleSheet.create({
  container: {
    height: DeviceHeight,
    width: DeviceWidth,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: Color.secondary.default,
    fontFamily: Font.pRegular,
  },
});
