import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { Color, Font } from '@/constants/constants';
import { router } from 'expo-router';
import CustomAvatar from './CustomAvatar';

interface Message {
  message: string;
  messageType: string;
  sender: {
    name: string;
    _id: string;
  };
  timestamp: string;
}

interface Props {
  message: Message;
}

const MessageBubble = ({ message }: Props) => {
  const { userId, otherChatParticipantAvatar, setOtherUser } = useCentralStore(
    useShallow((state) => ({
      userId: state.user.userInfo.userId,
      otherChatParticipantAvatar: state.otherChatParticipant.avatar,
      setOtherUser: state.setOtherUser,
    }))
  );

  const isMe = message.sender._id === userId;
  const viewProfile = (otherUserName: string) => {
    setOtherUser({ userId: message.sender._id, goBackRoute: '/Chat' });
    router.push('/OtherProfile');
  };

  return (
    <View
      style={[styles.container, isMe ? styles.rightAlign : styles.leftAlign]}
    >
      {!isMe && (
        <Pressable onPress={() => viewProfile(message.sender._id)}>
          <CustomAvatar
            avatar={otherChatParticipantAvatar}
            avatarStyle={styles.avatar}
          />
        </Pressable>
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
