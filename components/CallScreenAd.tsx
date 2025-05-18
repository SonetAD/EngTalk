import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import {
  NativeAdView,
  NativeAssetType,
  NativeAd,
  NativeAsset,
  TestIds,
} from 'react-native-google-mobile-ads';

import { AdKeyword } from '@/config';
import { Font, ImageBlurHash } from '@/constants/constants';

const CallScreenAd = () => {
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

  const adUnitId = __DEV__
    ? TestIds.NATIVE
    : 'ca-app-pub-6177013999348150/9547994985';

  useEffect(() => {
    NativeAd.createForAdRequest(adUnitId, {
      keywords: AdKeyword,
    })
      .then(setNativeAd)
      .catch(console.error);

    return () => {
      nativeAd?.destroy();
    };
  }, []);

  if (!nativeAd) return null;

  return (
    <View style={styles.cardContainer}>
      <NativeAdView
        nativeAd={nativeAd}
        style={styles.nativeAd}
      >
        <View style={styles.row}>
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
                style={styles.headline}
                numberOfLines={1}
              >
                {nativeAd.headline}
              </Text>
            </NativeAsset>
            <Text style={styles.sponsoredText}>Sponsored</Text>
          </View>
        </View>
      </NativeAdView>
    </View>
  );
};

export default CallScreenAd;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 0.4,
    borderColor: '#e2e2e2',
    minWidth: 240,
    maxWidth: 300,
  },
  nativeAd: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
  },
  headline: {
    fontSize: 13,
    fontFamily: Font.pMedium,
    color: '#111',
  },
  sponsoredText: {
    fontSize: 10,
    fontFamily: Font.pRegular,
    color: '#9ca3af',
  },
});
