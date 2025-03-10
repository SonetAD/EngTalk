import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import CustomButton from '@/components/CustomButton';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import RecordVoiceBites from './RecordVoiceBites';

interface Props {
  isLoading: boolean;
}

const NoPostAvailable = ({ isLoading }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const recordPopUp = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          color={Color.secondary.default}
          size='large'
        />
      ) : (
        <View style={styles.container}>
          <Ionicons
            name='cloud-outline'
            size={50}
            color={Color.secondary.twoHundred}
          />
          <Text style={styles.text}>No Voice Bites Yet</Text>
          <CustomButton
            text='Create A Bite'
            handlePress={recordPopUp}
            containerStyle={styles.btn}
          />
          <RecordVoiceBites ref={bottomSheetModalRef} />
        </View>
      )}
    </View>
  );
};

export default NoPostAvailable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: Color.secondary.oneHundred,
    fontFamily: Font.pRegular,
  },
  btn: {
    width: DeviceWidth * 0.5,
    marginTop: 5,
  },
});
