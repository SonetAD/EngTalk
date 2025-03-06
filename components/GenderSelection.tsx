import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Color, DeviceWidth, Font } from '@/constants/constants';

interface Props {
  gender: string;
  setGender: (selectedGender: string) => void;
  containerStyle?: object;
}

const GenderSelection = ({ gender, setGender, containerStyle }: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => setGender('male')}
      >
        <Text
          style={gender === 'male' ? { ...styles.txt, opacity: 1 } : styles.txt}
        >
          Male
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => setGender('female')}
      >
        <Text
          style={
            gender === 'female' ? { ...styles.txt, opacity: 1 } : styles.txt
          }
        >
          Female
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderSelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: DeviceWidth * 0.8,
  },
  btn: {
    backgroundColor: Color.black.twoHundred,
    height: 50,
    borderRadius: 8,
    width: '40%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  txt: {
    color: Color.white,
    fontFamily: Font.pMedium,
    opacity: 0.5,
    textAlign: 'center',
    fontSize: 13,
  },
});
