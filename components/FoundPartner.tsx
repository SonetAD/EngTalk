import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { act, useState } from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import CustomButton from '@/components/CustomButton';
import CustomAvatar from './CustomAvatar';

interface Props {
  name: string;
  avatar: { src: string; default: boolean };
  level: number;
  onSkip: () => void;
  onEnd: () => void;
  onAccept: () => void;
  isLoading: boolean;
}

const FoundPartner = ({
  name,
  avatar,
  level,
  onSkip,
  onAccept,
  onEnd,
  isLoading,
}: Props) => {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <View style={styles.container}>
      <CustomAvatar
        avatar={avatar}
        avatarStyle={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.level}>{`Level ${level}`}</Text>
      {isAccepted && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size='large'
            color={Color.white}
          />
        </View>
      )}
      {!isAccepted && (
        <View style={styles.btnGroup}>
          <CustomButton
            text='Skip'
            handlePress={onSkip}
            containerStyle={styles.skip}
            textStyle={styles.skipText}
          />
          <CustomButton
            text='Accept'
            handlePress={() => {
              onAccept();
              setIsAccepted(true);
            }}
            containerStyle={styles.accept}
            textStyle={styles.accept}
            isLoading={isLoading}
          />
          <CustomButton
            text='End'
            handlePress={onEnd}
            containerStyle={styles.end}
            textStyle={styles.endText}
          />
        </View>
      )}
    </View>
  );
};

export default FoundPartner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 10,
  },
  name: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pBold,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  level: {
    textAlign: 'center',
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: DeviceHeight * 0.1,
    width: DeviceWidth,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: DeviceHeight * 0.1,
    width: DeviceWidth,
  },
  skip: {
    backgroundColor: Color.gray.oneHundred,
    width: 100,
  },
  skipText: {
    color: Color.primary,
    fontFamily: Font.pRegular,
  },
  accept: {
    backgroundColor: Color.secondary.default,
    width: 100,
  },
  acceptText: {
    color: Color.primary,
    fontFamily: Font.pBold,
  },
  end: {
    backgroundColor: Color.red,
    width: 100,
  },
  endText: {
    color: Color.white,
    fontFamily: Font.pRegular,
  },
});
