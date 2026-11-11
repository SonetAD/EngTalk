import { StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@/constants/constants';

interface Props {
  name: React.ComponentProps<typeof Ionicons>['name'];
}

const CustomBrightIcon = ({ name }: Props) => {
  return (
    <Ionicons
      name={name}
      size={24}
      style={styles.icon}
    />
  );
};

export default CustomBrightIcon;

const styles = StyleSheet.create({
  icon: {
    color: Color.white,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowRadius: 4,
    textShadowOffset: { width: 1, height: 1 },
  },
});
