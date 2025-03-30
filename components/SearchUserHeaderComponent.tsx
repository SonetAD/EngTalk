import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import FormField from './FormField';
import { DeviceHeight } from '@/constants/dimensions';
import Color from '@/constants/color';
import CustomBrightIcon from './CustomBrightIcon';
import { router } from 'expo-router';

const SearchUserHeaderComponent = () => {
  const { searchUserText, setSearchUser } = useCentralStore(
    useShallow((state) => ({
      searchUserText: state.searchUserText,
      setSearchUser: state.setSearchUser,
    }))
  );
  const handleGoBack=()=>{
    setSearchUser('');
    router.back()

  }
  return (
    <View style={styles.container}>
      <Pressable onPress={handleGoBack}>
        <CustomBrightIcon name='arrow-back-outline' />
      </Pressable>

      <FormField
        placeholder='Search'
        value={searchUserText}
        onChangeText={setSearchUser}
        containerStyle={styles.inbox}
      />
    </View>
  );
};

export default SearchUserHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },

  inbox: {
    width: '90%',
    height: '100%',
  },
});
