import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import FullScreenView from '@/components/FullScreenView';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { Color, Font } from '@/constants/constants';
import convertSilverCoin from '@/libs/api/convertSilverCoin';
import * as Haptics from 'expo-haptics';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { AdKeyword } from '@/config';
import { router } from 'expo-router';

const ConvertSilverCoinScreen = () => {
  const { token, totalSilverCoin } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      totalSilverCoin: state.userStat.totalSilverCoin,
    }))
  );

  const adUnitId = __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-6177013999348150~4597785166';

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    keywords: AdKeyword,
  });

  const [converting, setConverting] = useState(true);
  const [earnedReward, setEarnedReward] = useState(false);

  const goldCoin = Math.floor(totalSilverCoin / 5);
  const isConvertable = totalSilverCoin >= 5;

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setConverting(false);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        setEarnedReward(true);
      }
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (earnedReward) {
        try {
          setConverting(true);
          await convertSilverCoin({ token });
          setConverting(false);
        } catch (err) {
        } finally {
          router.replace('/Home');
        }
      }
    })();
  }, [earnedReward]);
  const convertCoin = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    rewarded.show();
  };

  return (
    <FullScreenView>
      <View style={styles.centerContent}>
        <Text style={styles.instructionText}>Turn silver into gold</Text>
        {!isConvertable && (
          <Text style={[styles.instructionText, styles.warning]}>
            Not enouth coins!
          </Text>
        )}

        <View style={styles.card}>
          <View style={styles.coinRow}>
            <View style={styles.coin}>
              <Ionicons
                name='medal-outline'
                size={32}
                color={Color.silver}
              />
              <Text style={styles.coinText}>{totalSilverCoin}</Text>
            </View>

            <Ionicons
              name='arrow-forward'
              size={24}
              color={Color.secondary.default}
              style={styles.arrow}
            />

            <View style={styles.coin}>
              <Ionicons
                name='medal-outline'
                size={32}
                color='gold'
              />
              <Text style={styles.coinText}>{goldCoin}</Text>
            </View>
          </View>
        </View>
        <Pressable
          style={[styles.button, !isConvertable && styles.buttonDisabled]}
          disabled={!isConvertable}
          onPress={convertCoin}
        >
          {converting ? (
            <ActivityIndicator
              color={Color.secondary.default}
              size='small'
            />
          ) : (
            <Text
              style={[
                styles.buttonText,
                !isConvertable && styles.buttonTextDisable,
              ]}
            >
              Convert
            </Text>
          )}
        </Pressable>
      </View>
    </FullScreenView>
  );
};

export default ConvertSilverCoinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  instructionText: {
    fontSize: 16,
    color: Color.white,
    fontFamily: Font.pRegular,
    marginBottom: 24,
    opacity: 0.7,
    textAlign: 'center',
  },
  warning: {
    color: Color.red,
    fontFamily: Font.pSemiBold,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  coin: {
    alignItems: 'center',
  },
  coinText: {
    fontSize: 20,
    color: Color.white,
    fontFamily: Font.pSemiBold,
    marginTop: 4,
  },
  arrow: {
    marginHorizontal: 12,
  },
  button: {
    marginTop: 50,
    backgroundColor: Color.secondary.default,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonDisabled: {
    backgroundColor: Color.primary,
    borderWidth: 1,
    borderColor: Color.silver,
  },
  buttonText: {
    color: Color.primary,
    fontSize: 16,
    fontFamily: Font.pBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonTextDisable: {
    color: Color.silver,
    fontFamily: Font.pRegular,
  },
});
