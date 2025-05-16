import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { Color, Font } from '@/constants/constants';
import { router } from 'expo-router';
import CustomAvatar from './CustomAvatar';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { runOnJS } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { NotificationSocket } from '@/libs/Socket';
import IsItALink from '@/libs/isItALink';
import openLink from '@/libs/openLink';

interface Message {
  _id: string;
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
  handleDeleteMessage: (messageId: string) => void;
}

const MessageBubble = ({ message, handleDeleteMessage }: Props) => {
  const {
    userId,
    otherChatParticipantAvatar,
    otherChatParticipantUserId,
    setOtherUser,
  } = useCentralStore(
    useShallow((state) => ({
      userId: state.user.userInfo.userId,
      otherChatParticipantAvatar: state.otherChatParticipant.avatar,
      otherChatParticipantUserId: state.otherChatParticipant.userId,
      setOtherUser: state.setOtherUser,
    }))
  );

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = ['8%'];

  const isMe = message.sender._id === userId;

  const viewProfile = (otherUserName: string) => {
    setOtherUser({ userId: message.sender._id, goBackRoute: '/Chat' });
    router.push('/OtherProfile');
  };

  const deletePopUp = () => {
    bottomSheetModalRef.current?.present();
  };

  const openMessageURL = () => {
    const isLink = IsItALink(message.message);
    if (isLink) {
      openLink(message.message);
    }
  };

  const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
    if (isMe && success) {
      runOnJS(deletePopUp)();
    }
  });
  const handleDelete = async () => {
    bottomSheetModalRef.current?.dismiss();
    if (message._id) {
      await handleDeleteMessage(message._id);
      NotificationSocket.emit('deleteMessage', {
        userId: otherChatParticipantUserId,
      });
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.1}
      />
    ),
    []
  );

  return (
    <GestureDetector gesture={longPressGesture}>
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
              <Pressable onPress={openMessageURL}>
                <Text
                  style={[
                    isMe ? styles.myMessage : styles.otherMessage,
                    IsItALink(message.message) && styles.link,
                  ]}
                >
                  {message.message}
                </Text>
              </Pressable>
            </LinearGradient>
          </BlurView>
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          stackBehavior='replace'
          enablePanDownToClose={true}
          snapPoints={snapPoints}
          index={1}
          handleStyle={styles.handleStyle}
          backdropComponent={renderBackdrop}
        >
          <Pressable onPress={handleDelete}>
            <BottomSheetView style={styles.bottomSheetContainer}>
              <Text style={styles.delete}>Delete</Text>
              <Ionicons
                name='trash-outline'
                size={24}
                color={Color.red}
              />
            </BottomSheetView>
          </Pressable>
        </BottomSheetModal>
      </View>
    </GestureDetector>
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
  handleStyle: {
    display: 'none',
  },
  bottomSheetContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(22, 22, 34, 0.9)',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  delete: {
    fontFamily: Font.pBold,
    color: Color.gray.oneHundred,
  },
  link: {
    color: Color.secondary.default,
    textDecorationLine: 'underline',
  },
});
