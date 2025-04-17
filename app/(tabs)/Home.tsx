import {
  Linking,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import FullScreenView from '@/components/FullScreenView';
import CustomButton from '@/components/CustomButton';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import Font from '@/constants/font';
import Color from '@/constants/color';
import { router } from 'expo-router';
import OnlineNow from '@/components/OnlineNow';
import HomePageStat from '@/components/HomePageStat';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import GenderFilterComponent from '@/components/GenderFilterComponent';
import { useState } from 'react';
import CustomModal from '@/components/CustomModal';

const Home = () => {
  const {
    isLoading,
    isError,
    error,
    totalGoldCoin,
    totalTrophy,
    talkTime,
    location,
  } = useCentralStore(
    useShallow((state) => ({
      isLoading: state.authStatus.isLoading,
      isError: state.authStatus.isError,
      error: state.authStatus.error,
      totalGoldCoin: state.userStat.totalGoldCoin,
      totalTrophy: state.userStat.totalTrophy,
      talkTime: state.userStat.talkTime,
      location: state.user.userInfo.location,
    }))
  );

  const [showAllowLocation, setShowAllowLocation] = useState(false);

  const startCall = () => {
    if (!isError && !location) {
      setShowAllowLocation(true);
    } else {
      router.push('/Call');
    }
  };

  const openSettings = () => {
    setShowAllowLocation(false);
    Linking.openSettings().catch(() => console.log('Unable to open settings'));
  };

  return (
    <FullScreenView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headline}>Speak With Confidence</Text>
        <OnlineNow />
        <HomePageStat
          goldCoin={totalGoldCoin}
          trophy={totalTrophy}
          talkTime={talkTime}
        />
        <GenderFilterComponent />

        <CustomButton
          text='Find Partner'
          containerStyle={styles.btn}
          handlePress={startCall}
          isLoading={isLoading}
        />
      </ScrollView>
      <View>
        <CustomModal
          isVisible={showAllowLocation}
          setVisibility={setShowAllowLocation}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Allow Location</Text>
            <Text style={styles.modalText}>
              Go to settings and enable location
            </Text>
            <Pressable
              onPress={openSettings}
              style={styles.enableSettingBtn}
            >
              <Text>Enable</Text>
            </Pressable>
          </View>
        </CustomModal>
      </View>
    </FullScreenView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headline: {
    color: Color.white,
    fontFamily: Font.pSemiBold,
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 50,
    textAlign: 'center',
  },
  btn: {
    width: DeviceWidth * 0.5,
    marginTop: DeviceHeight * 0.1,
  },
  modalContent: {
    backgroundColor: Color.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  enableSettingBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: Color.gray.oneHundred,
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
