import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { AdKeyword } from '@/config';
import { Font, ImageBlurHash } from '@/constants/constants';

const NativeAdComponent = () => {
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

  const adUnitId = __DEV__
    ? TestIds.NATIVE
    : 'ca-app-pub-6177013999348150~4597785166';

  useEffect(() => {
    NativeAd.createForAdRequest(adUnitId, {
      keywords: AdKeyword,
      aspectRatio: NativeMediaAspectRatio.LANDSCAPE,
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
              <Text style={styles.adHeadLine}>{nativeAd.headline}</Text>
            </NativeAsset>
            <Text style={styles.sponsoredText}>Sponsored</Text>
          </View>
        </View>

        <NativeMediaView style={styles.mediaView} />
      </NativeAdView>
    </View>
  );
};

export default NativeAdComponent;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  nativeAd: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  adIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  adHeadLine: {
    fontSize: 16,
    fontFamily: Font.pSemiBold,
    color: '#1c1c1e',
  },
  sponsoredText: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 2,
  },
  mediaView: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
});
