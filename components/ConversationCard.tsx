import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type User = {
  userName: string;
  name: string;
  avatar: {
    default: boolean;
    src: string;
  };
};
type Conversation = {
  participants: User[];
  lastMessage:{
    message: string;
    sender: User;
    timestamp: string;
  }
};
interface Props {
  conversation: Conversation;
}
const ConversationCard = ({conversation}:Props) => {
  return (
    <View>
      <Text>ConversationCard</Text>
    </View>
  );
};

export default ConversationCard;

const styles = StyleSheet.create({});
