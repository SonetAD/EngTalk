import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Error = () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Something went wrong.Please restart!</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  },
});
