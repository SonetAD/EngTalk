import { StyleSheet, Text, View, Pressable } from 'react-native';
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
import getAdKeyword from '@/libs/getAdKeyword';

const NativeAdComponent = () => {
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

  const adUnitId = __DEV__
    ? TestIds.NATIVE
    : 'ca-app-pub-6177013999348150/9547994985';

  useEffect(() => {
    NativeAd.createForAdRequest(adUnitId, {
      keywords: getAdKeyword(),
      aspectRatio: NativeMediaAspectRatio.LANDSCAPE,
    })
      .then(setNativeAd)
      .catch(console.error);

    return () => {
      nativeAd?.destroy();
    };
  }, []);

  if (!nativeAd) return null;

  const starRating = nativeAd.starRating;
  const hasStarRating =
    starRating !== null && starRating !== undefined && starRating > 0;

  const renderStars = () => {
    if (!hasStarRating) return null;
    const fullStars = Math.floor(starRating);
    const halfStar = starRating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (halfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }

    return (
      <Text style={styles.starRatingText}>
        {stars.join(' ')} ({starRating.toFixed(1)})
      </Text>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <NativeAdView
        nativeAd={nativeAd}
        style={styles.nativeAd}
      >
        <View style={styles.adBadge}>
          <Text style={styles.adBadgeText}>Ad</Text>
        </View>

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
            {renderStars()}
          </View>
        </View>

        <NativeMediaView style={styles.mediaView} />

        {nativeAd.callToAction && (
          <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
            <Pressable
              style={styles.ctaButton}
              onPress={() => nativeAd.performClick()}
            >
              <Text style={styles.ctaText}>{nativeAd.callToAction}</Text>
            </Pressable>
          </NativeAsset>
        )}
      </NativeAdView>
    </View>
  );
};

export default NativeAdComponent;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 6,
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    borderWidth: 0.4,
    borderColor: '#e5e5e5',
    overflow: 'hidden',
  },
  nativeAd: {
    padding: 10,
  },
  adBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
    minWidth: 15,
    minHeight: 15,
  },
  adBadgeText: {
    fontSize: 12,
    fontFamily: Font.pSemiBold,
    color: '#374151',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  adIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
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
    fontFamily: Font.pRegular,
    marginTop: 2,
  },
  starRatingText: {
       fontSize: 14,
    fontFamily: Font.pSemiBold,
    color: '#b45309',
    marginTop: 4,
  },
  mediaView: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderWidth: 0.4,
    borderColor: '#d4d4d4',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#2563eb',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Font.pSemiBold,
  },
});
