import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FullScreenView from '@/components/FullScreenView';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import CustomButton from '@/components/CustomButton';
import { Redirect, router } from 'expo-router';
import LocalStore from '@/libs/localStore';

const App = () => {
  const isUserLoggedIn = LocalStore.contains('userName');

  const handlePress = () => {
    router.navigate('/Signin');
  };

  if (isUserLoggedIn) {
    return <Redirect href='/Explore' />;
  }

  return (
    <FullScreenView>
      <ScrollView style={styles.content}>
        <View style={styles.main}>
          <Text style={styles.headline}>
            Eng<Text style={styles.engTalk}>Talk</Text>
          </Text>
          <Text style={styles.tagLine}>Connect globally & speak fluently</Text>
          <CustomButton
            text='Get Started'
            handlePress={handlePress}
            containerStyle={styles.btn}
          />
        </View>
      </ScrollView>
    </FullScreenView>
  );
};

export default App;

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: '100%',
  },
  main: {
    height: DeviceHeight,
    width: DeviceWidth,
    alignItems: 'center',
  },
  headline: {
    color: Color.white,
    fontFamily: Font.pSemiBold,
    fontSize: 34,
    marginHorizontal: 10,
    marginTop: 100,
    textAlign: 'center',
  },
  engTalk: {
    color: Color.secondary.twoHundred,
    fontFamily: Font.pBold,
  },
  tagLine: {
    marginTop: 7,
    textAlign: 'center',
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 14,
    textAlignVertical: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: DeviceHeight * 0.15,
  },
});
