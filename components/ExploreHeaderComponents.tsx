import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';
import RecordVoiceBites from './RecordVoiceBites';
import { BottomSheetModal } from '@gorhom/bottom-sheet';


const ExploreHeaderComponent = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const recordPopUp = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>explore</Text>
      <Pressable onPress={recordPopUp}>
        <Ionicons
          name='add-outline'
          size={20}
          color={Color.white}
        />
      </Pressable>
      <RecordVoiceBites ref={bottomSheetModalRef} />
    </View>
  );
};

export default ExploreHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
});
