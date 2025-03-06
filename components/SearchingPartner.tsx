import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AnimatedSearch from '@/components/SearchAnimation';
import { Color, DeviceHeight, Font } from '@/constants/constants';
import CustomButton from '@/components/CustomButton';

interface Props {
  onEnd: () => void;
}

const SearchingPartner = ({ onEnd }:Props) => {
  return (
    <View style={styles.container}>
      <AnimatedSearch />
      <Text style={styles.headline}>Finding a Partner...</Text>
      <CustomButton
      text='End'
        containerStyle={styles.btn}
        handlePress={onEnd}
        textStyle={styles.btnText}
      />
    </View>
  );
};

export default SearchingPartner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headline: {
    color: Color.white,
    fontFamily: Font.pSemiBold,
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    top: DeviceHeight * 0.53,
  },
  btn: {
    position: 'absolute',
    bottom: DeviceHeight * 0.1,
    backgroundColor: Color.red,
    width: 100,
  },
  btnText: {
    color: 'white',
  },
});
