import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import CustomAvatar from '@/components/CustomAvatar';
import FullScreenView from '@/components/FullScreenView';

const FullScreenAvatar = () => {
  const { src, stockAvatar } = useLocalSearchParams();
  const avatar = {
    // Route params may be string[]; cast keeps the previous runtime behaviour.
    src: (src || '') as string,
    stockAvatar: (stockAvatar || '') as string,
  };
  return (
    <FullScreenView>
      <View style={styles.container}>
        <CustomAvatar
          avatar={avatar}
          avatarStyle={styles.avatarStyle}
        />
      </View>
    </FullScreenView>
  );
};

export default FullScreenAvatar;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarStyle: {
    width: '100%',
    height: '50%',
    borderRadius: 5,
  },
});
