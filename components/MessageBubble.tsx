import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { Color, Font, ImageBlurHash } from '@/constants/constants';
import { Image } from 'expo-image';
import getAvatarUrl from '@/libs/getAvatarUrl';

interface Message {
  _id: string;
  message: string;
  messageType: string;
  sender: {
    _id: string;
    avatar: { src: string; default: boolean };
    name: string;
    userName: string;
  };
  timestamp: string;
}

interface Props {
  message: Message;
}

const MessageBubble = ({ message }: Props) => {
  const { userName } = useCentralStore(
    useShallow((state) => ({
      userName: state.user.userInfo.userName,
    }))
  );

  const isMe = message.sender.userName === userName;

  return (
    <View
      style={[styles.container, isMe ? styles.rightAlign : styles.leftAlign]}
    >
      {!isMe && (
        <Image
          source={getAvatarUrl(message.sender.avatar)}
          placeholder={ImageBlurHash}
          contentFit='cover'
          transition={1000}
          style={styles.avatar}
        />
      )}

      <View
        style={[
          styles.messageWrapper,
          isMe ? styles.myMessageWrapper : styles.otherMessageWrapper,
        ]}
      >
        <BlurView
          intensity={30}
          tint={isMe ? 'light' : 'dark'}
          style={styles.blurContainer}
        >
          <LinearGradient
            colors={
              isMe
                ? ['rgba(255,156,1,0.3)', 'rgba(255,144,1,0.2)']
                : ['rgba(35,37,51,0.4)', 'rgba(30,30,45,0.3)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.textContainer}
          >
            <Text style={isMe ? styles.myMessage : styles.otherMessage}>
              {message.message}
            </Text>
          </LinearGradient>
        </BlurView>
      </View>
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  rightAlign: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  leftAlign: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 8,
  },
  messageWrapper: {
    maxWidth: '75%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
  },
  otherMessageWrapper: {
    alignSelf: 'flex-start',
  },
  blurContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  textContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  myMessage: {
    fontSize: 15,
    color: Color.white,
    fontFamily: Font.pSemiBold,
  },
  otherMessage: {
    fontSize: 15,
    color: Color.gray.oneHundred,
    fontFamily: Font.pBold,
  },
});
