import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

      <View style={styles.textContainer}>
        <Text style={isMe ? styles.myMessage : styles.otherMessage}>
          {message.message}
        </Text>
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
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 8,
  },
  textContainer: {
    maxWidth: '75%',
  },
  myMessage: {
    fontSize: 15,
    color: Color.secondary.default,
    fontFamily:Font.pSemiBold
  },
  otherMessage: {
    fontSize: 15,
    color: Color.white,
    fontFamily: Font.pBold,
  },
});
