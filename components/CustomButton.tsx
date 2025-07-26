import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import * as Haptics from 'expo-haptics';

interface Props {
  text: string;
  handlePress: () => void;
  containerStyle?: object;
  textStyle?: object;
  isLoading?: boolean;
  feedBackOff?: boolean;
}

const CustomButton = ({
  text,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
  feedBackOff,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!feedBackOff) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        handlePress();
      }}
      style={
        isLoading
          ? [styles.container, containerStyle, { opacity: 0.8 }]
          : [styles.container, containerStyle]
      }
      disabled={isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator
          size='small'
          color='#000'
        />
      ) : (
        <Text style={[styles.title, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth * 0.8,
    minHeight: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Color.secondary.default,
  },
  title: {
    fontFamily: Font.pSemiBold,
    fontSize: 18,
    color: Color.primary,
    textAlign: 'center',
  },
});
