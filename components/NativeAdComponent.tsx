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

import { Font, ImageBlurHash } from '@/constants/constants';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import getAdKeyword from '@/libs/getAdKeyword';

const NativeAdComponent = () => {
  const {  gender  } = useCentralStore(
    useShallow((state) => ({
      gender: state.user.userInfo.gender,
    }))
  );
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

  const adUnitId = __DEV__
    ? TestIds.NATIVE
    : 'ca-app-pub-6177013999348150/9547994985';

  useEffect(() => {
    NativeAd.createForAdRequest(adUnitId, {
      keywords: getAdKeyword(gender),
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
    marginHorizontal: 10,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 0.4,
    borderColor: '#e5e5e5',
  },
  nativeAd: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  adIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#f1f1f1',
  },
  adHeadLine: {
    fontSize: 14,
    fontFamily: Font.pSemiBold,
    color: '#111827',
  },
  sponsoredText: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
    fontFamily: Font.pRegular,
  },
  mediaView: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderWidth: 0.4,
    borderColor: '#d4d4d4',
  },
});
