import { StyleSheet, Text, View } from 'react-native';
import FullScreenView from '@/components/FullScreenView';
import CustomLoadingPage from '@/components/CustomLoadingPage';
import CustomButton from '@/components/CustomButton';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import Font from '@/constants/font';
import Color from '@/constants/color';
import { router } from 'expo-router';
import OnlineNow from '@/components/OnlineNow';
import HomePageStat from '@/components/HomePageStat';
import { useEffect } from 'react';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';

const Home = () => {
  const {
    token,
    isLoading,
    isError,
    error,
    totalGoldCoin,
    totalTrophy,
    talkTime,
    getUserStat,
  } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      isLoading: state.authStatus.isLoading,
      isError: state.authStatus.isError,
      error: state.authStatus.error,
      totalGoldCoin: state.userStat.totalGoldCoin,
      totalTrophy: state.userStat.totalTrophy,
      talkTime: state.userStat.talkTime,
      getUserStat: state.getUserStat,
    }))
  );

  useEffect(() => {
    if (token) {
      getUserStat({ token });
    }
  }, [token]);

  const startCall = () => {
    router.push('/Call');
  };

  return (
    <FullScreenView>
      <View style={styles.container}>
        <Text style={styles.headline}>Speak With Confidence</Text>
        <OnlineNow />
        <HomePageStat
          goldCoin={totalGoldCoin}
          trophy={totalTrophy}
          talkTime={talkTime}
        />

        <CustomButton
          text='Find a Partner'
          containerStyle={styles.btn}
          handlePress={startCall}
          isLoading={isLoading}
        />
      </View>
    </FullScreenView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    position: 'absolute',
    bottom: DeviceHeight * 0.1,
  },
});
