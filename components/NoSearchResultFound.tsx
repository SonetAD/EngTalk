import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Font, Color, DeviceHeight, DeviceWidth } from '@/constants/constants';

const NoSearchResultFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No result found</Text>
    </View>
  );
};

export default NoSearchResultFound;

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
    color: Color.red,
    fontFamily: Font.pRegular,
  },
});
