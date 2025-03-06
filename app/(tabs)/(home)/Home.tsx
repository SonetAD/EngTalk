import { StyleSheet, Text, View } from 'react-native';
import FullScreenView from '@/components/FullScreenView';
import { useDispatch, useSelector } from 'react-redux';
import CustomLoadingPage from '@/components/CustomLoadingPage';
import CustomButton from '@/components/CustomButton';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import Font from '@/constants/font';
import Color from '@/constants/color';
import {  router } from 'expo-router';
import OnlineNow from '@/components/OnlineNow';
import HomePageStat from '@/components/HomePageStat';
import { useEffect } from 'react';
import { updateUserStat } from '@/redux/features/user/userStatSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { user, isError, isLoading, error } = useSelector(
    (state: any) => state.auth
  );
  const { totalGoldCoin, totalTrophy, talkTime } = useSelector(
    (state: any) => state.userStat
  );

  useEffect(() => {
    if (user.token) {
      dispatch(updateUserStat({ token: user.token, talkTime: null }));
    }
  }, [isLoading]);

  if (isLoading || isError) return <CustomLoadingPage />;

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
