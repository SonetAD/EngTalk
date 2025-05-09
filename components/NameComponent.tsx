import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, Font } from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';
import trimLongString from '@/libs/trimLongString';

interface Props {
  name: string;
  isBlueTicked: boolean;
  fontStyle?: {};
  iconSize?:number
  nameLength?: number;
}

const NameComponent = ({ name, isBlueTicked, fontStyle,nameLength=15,iconSize=20 }: Props) => {
  return (
    <View style={styles.nameRow}>
    <Text style={[styles.name,fontStyle]}> {trimLongString({text:name,size:nameLength})}</Text>
      {isBlueTicked && (
        <Ionicons
          name='checkmark-circle'
          size={iconSize}
          color={Color.blueTick}
        />
      )}
    </View>
  );
};

export default NameComponent;

const styles = StyleSheet.create({
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  name: {
    color: Color.white,
    fontFamily: Font.pBold,
    fontSize: 20,
  },
});
