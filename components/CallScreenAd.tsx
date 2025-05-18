import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'expo-image';
import {
  NativeAdView,
  NativeAssetType,
  NativeAd,
  NativeAsset,
  NativeMediaView,
  TestIds,
  NativeMediaAspectRatio,
} from 'react-native-google-mobile-ads';

import { Font, ImageBlurHash } from '@/constants/constants';
import trimLongString from '@/libs/trimLongString';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import getAdKeyword from '@/libs/getAdKeyword';

const { width: DEVICE_WIDTH } = Dimensions.get('window');

const CallScreenAd = () => {
  const { gender } = useCentralStore(
    useShallow((state) => ({
      gender: state.user.userInfo.gender,
    }))
  );

  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);
  const nativeAdRef = useRef<NativeAd | null>(null);

  const adUnitId = __DEV__
    ? TestIds.NATIVE
    : 'ca-app-pub-6177013999348150/9547994985';

  const loadAd = () => {
    NativeAd.createForAdRequest(adUnitId, {
      keywords: getAdKeyword(gender),
      aspectRatio: NativeMediaAspectRatio.LANDSCAPE,
    })
      .then((ad) => {
        nativeAdRef.current?.destroy();
        nativeAdRef.current = ad;
        setNativeAd(ad);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadAd();

    const interval = setInterval(() => {
      loadAd();
    }, 300000);

    return () => {
      clearInterval(interval);
      nativeAdRef.current?.destroy();
    };
  }, []);

  if (!nativeAd) return null;

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <NativeAdView
          nativeAd={nativeAd}
          style={styles.nativeAd}
        >
          <View style={styles.adRow}>
            {/* Media on left */}
            <NativeMediaView style={styles.mediaView} />

            {/* Text content on right */}
            <View style={styles.textContent}>
              <View style={styles.header}>
                {nativeAd.icon && (
                  <NativeAsset assetType={NativeAssetType.ICON}>
                    <Image
                      source={nativeAd.icon.url}
                      placeholder={ImageBlurHash}
                      style={styles.adIcon}
                    />
                  </NativeAsset>
                )}
                <View style={{ flex: 1 }}>
                  <NativeAsset assetType={NativeAssetType.HEADLINE}>
                    <Text
                      style={styles.adHeadLine}
                      numberOfLines={1}
                    >
                      {trimLongString({ text: nativeAd.headline })}
                    </Text>
                  </NativeAsset>
                  <Text style={styles.sponsoredText}>Sponsored</Text>
                </View>
              </View>
            </View>
          </View>
        </NativeAdView>
      </View>
    </View>
  );
};

export default CallScreenAd;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
  },
  cardContainer: {
    width: DEVICE_WIDTH * 0.6, // keep original 60% width
    height: 90, // keep original height
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 0.3,
    borderColor: '#e5e5e5',
  },
  nativeAd: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  adRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  mediaView: {
    width: 80, // smaller media width to keep it compact
    height: 78, // slightly less than card height for nice padding
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderWidth: 0.3,
    borderColor: '#d4d4d4',
  },

  textContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  adIcon: {
    width: 22,
    height: 22,
    borderRadius: 5,
    marginRight: 6,
    backgroundColor: '#f1f1f1',
  },

  adHeadLine: {
    fontSize: 13,
    fontFamily: Font.pSemiBold,
    color: '#111827',
  },

  sponsoredText: {
    fontSize: 9,
    color: '#6b7280',
    marginTop: 2,
    fontFamily: Font.pRegular,
  },
});
