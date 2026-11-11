import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Color, DeviceHeight, Font } from '@/constants/constants';
import RecordVoiceBites from './RecordVoiceBites';
import CustomBrightIcon from './CustomBrightIcon';

interface Props {
  recordPopUp: () => void;
  reference: React.Ref<BottomSheetModal>;
}
const ExploreHeaderComponent = ({ reference, recordPopUp }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>explore</Text>
      <Pressable onPress={recordPopUp}>
        <CustomBrightIcon name='add-outline' />
      </Pressable>
      <RecordVoiceBites ref={reference} />
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
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },
  title: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
});
