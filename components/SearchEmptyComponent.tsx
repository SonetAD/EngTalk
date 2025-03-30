import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Font, Color, DeviceHeight, DeviceWidth } from '@/constants/constants';

const SearchEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search by name,username or email </Text>
    </View>
  );
};

export default SearchEmptyComponent;

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
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
  },
});
