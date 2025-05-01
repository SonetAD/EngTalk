import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInUp, BounceIn, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Font from '@/constants/font';
import Color from '@/constants/color';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import * as Haptics from 'expo-haptics';
import CustomModal from './CustomModal';
import { router } from 'expo-router';

const GenderFilterComponent = () => {
  const { filteredGender, setCallInfo, totalGoldCoin } = useCentralStore(
    useShallow((state) => ({
      filteredGender: state.call.filteredGender,
      setCallInfo: state.setCallInfo,
      totalGoldCoin: state.userStat.totalGoldCoin,
    }))
  );

  const [showAlert, setShowAlert] = useState(false);
  const selectGender = (gender: string) => {
    if (totalGoldCoin >= 5) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCallInfo({
        filteredGender: gender,
      });
    } else {
      if (gender !== 'any') {
        setShowAlert(true);
      }
    }
  };

  const handlePress = () => {
    setShowAlert(false);
    router.navigate('/ConvertSilverCoinScreen');
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(700)}
      style={styles.statsContainer}
    >
      <Pressable onPress={() => selectGender('any')}>
        <Animated.View
          entering={BounceIn.delay(300)}
          style={styles.statBox}
        >
          <Ionicons
            name='male-female-outline'
            size={30}
            color={
              filteredGender === 'any'
                ? Color.secondary.default
                : Color.gray.oneHundred
            }
          />
          <Text
            style={[
              styles.genderTxt,
              filteredGender === 'any' && styles.selectedText,
            ]}
          >
            Any
          </Text>
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => selectGender('female')}>
        <Animated.View
          entering={BounceIn.delay(700)}
          style={styles.statBox}
        >
          <Ionicons
            name='female'
            size={30}
            color={
              filteredGender === 'female'
                ? Color.secondary.default
                : Color.gray.oneHundred
            }
          />
          <Text
            style={[
              styles.genderTxt,
              filteredGender === 'female' && styles.selectedText,
            ]}
          >
            Female
          </Text>
        </Animated.View>
      </Pressable>
      <Pressable onPress={() => selectGender('male')}>
        <Animated.View
          entering={BounceIn.delay(500)}
          style={styles.statBox}
        >
          <Ionicons
            name='male'
            size={30}
            color={
              filteredGender === 'male'
                ? Color.secondary.default
                : Color.gray.oneHundred
            }
          />
          <Text
            style={[
              styles.genderTxt,
              filteredGender === 'male' && styles.selectedText,
            ]}
          >
            Male
          </Text>
        </Animated.View>
      </Pressable>
      <CustomModal
        isVisible={showAlert}
        setVisibility={setShowAlert}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Not Yet</Text>
          <Text style={styles.modalText}>Talk more, unlock filter!</Text>
          <Pressable
            onPress={handlePress}
            style={styles.closeBtn}
          >
            <Text>Redeem</Text>
          </Pressable>
        </View>
      </CustomModal>
    </Animated.View>
  );
};

export default GenderFilterComponent;

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
    backgroundColor: Color.black.twoHundred,
    padding: 15,
    borderRadius: 10,
  },
  statBox: {
    alignItems: 'center',
    padding: 10,
  },
  genderTxt: {
    fontSize: 12,
    fontFamily: Font.pRegular,
    color: Color.gray.oneHundred,
    marginTop: 5,
  },
  selectedText: {
    fontFamily: Font.pBold,
    color: Color.white,
  },
  modalContent: {
    backgroundColor: Color.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: 'gold',
    fontFamily: Font.pBold,
    borderRadius: 10,
  },
  modalTitle: {
    fontFamily: Font.pSemiBold,
    color: Color.red,
  },
  modalText: {
    fontFamily: Font.pRegular,
    textAlign: 'center',
  },
});
