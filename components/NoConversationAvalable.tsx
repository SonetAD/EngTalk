import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';

const NoConversationAvalable = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Ionicons
          name='mail-open-outline'
          size={50}
          color={Color.secondary.twoHundred}
        />
        <Text style={styles.text}>No message avalable</Text>
      </View>
    </View>
  );
};

export default NoConversationAvalable;

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
    color: Color.secondary.oneHundred,
    fontFamily: Font.pRegular,
  },
});
