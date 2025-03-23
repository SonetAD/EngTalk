import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

const LeaderBoardHeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>leaderboard</Text>
    </View>
  );
};

export default LeaderBoardHeaderComponent;

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
