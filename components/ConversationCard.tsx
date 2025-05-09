import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, Font } from '@/constants/constants';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import CustomAvatar from './CustomAvatar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import trimLongString from '@/libs/trimLongString';

type User = {
  _id: string;
  name: string;
  avatar: {
    default: boolean;
    src: string;
  };
  isBlueTicked: boolean;
};
type Conversation = {
  participants: User[];
  lastMessage: {
    message: string;
    sender: User;
    timestamp: string;
  };
  readStatus: boolean;
};
interface Props {
  conversation: Conversation;
}

const ConversationCard = ({ conversation }: Props) => {
  const { userId, getConversation } = useCentralStore(
    useShallow((state) => ({
      userId: state.user.userInfo.userId,
      getConversation: state.getConversation,
    }))
  );

  const otherUser: any = conversation.participants.find(
    (user) => user._id !== userId
  );

  const isMessageFromUser = conversation.lastMessage.sender._id === userId;
  const formattedMessage = isMessageFromUser
    ? `You: ${conversation.lastMessage.message}`
    : conversation.lastMessage.message;

  const openChatScreen = () => {
    useCentralStore.setState((prev) => ({
      conversationStatus: {
        ...prev.conversationStatus,
        isLoading: true,
        isError: false,
        error: '',
      },
    }));
    getConversation(otherUser._id);
    router.push('/Chat');
  };

  return (
    <Pressable onPress={openChatScreen}>
      <View style={styles.container}>
        <CustomAvatar
          avatar={otherUser.avatar}
          avatarStyle={styles.avatar}
        />

        <View style={styles.textContainer}>
          <View style={styles.nameRow}>
            <Text
              style={[
                styles.name,
                !conversation.readStatus && styles.unreadMessage,
              ]}
            >
              {trimLongString({ text: otherUser.name })}
            </Text>
            {otherUser.isBlueTicked && (
              <Ionicons
                name='checkmark-circle'
                size={16}
                color={Color.blueTick}
              />
            )}
          </View>

          <Text
            style={[
              styles.message,
              !conversation.readStatus && styles.unreadMessage,
            ]}
            numberOfLines={1}
          >
            {formattedMessage}
          </Text>
        </View>

        <Text style={styles.timestamp}>
          {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </Pressable>
  );
};

export default ConversationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.black.twoHundred,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  name: {
    fontSize: 16,
    fontFamily: Font.pRegular,
    color: Color.gray.oneHundred,
  },
  message: {
    fontSize: 14,
    fontFamily: Font.pRegular,
    color: Color.gray.oneHundred,
  },
  unreadMessage: {
    fontFamily: Font.pSemiBold,
    color: Color.white,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: Font.pLight,
    color: Color.gray.oneHundred,
  },
});
