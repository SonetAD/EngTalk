import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { act, useState } from 'react';
import { Image } from 'expo-image';
import {
  Color,
  DeviceHeight,
  DeviceWidth,
  Font,
  ImageBlurHash,
} from '@/constants/constants';
import CustomButton from '@/components/CustomButton';
import { Backend } from '@/config';

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
  const avatarImageSrc = avatar.default
    ? `${Backend.baseURL}/default/avatars/${avatar.src}`
    : `${Backend.baseURL}/default/avatars/${avatar.src}`;

  return (
    <View style={styles.container}>
      <Image
        source={avatarImageSrc}
        placeholder={ImageBlurHash}
        contentFit='cover'
        transition={1000}
        style={styles.avatar}
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
    height: 100,
    width: 100,
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
