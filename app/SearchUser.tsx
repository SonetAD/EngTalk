import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import userSearch from '@/libs/api/userSearch';
import SearchEmptyComponent from '@/components/SearchEmptyComponent';
import SearchUserResultCard from '@/components/SearchUserResultCard';
import { FlashList } from '@shopify/flash-list';
import Color from '@/constants/color';
import NoSearchResultFound from '@/components/NoSearchResultFound';

const SearchUser = () => {
  const { searchUserText, setSearchUser } = useCentralStore(
    useShallow((state) => ({
      searchUserText: state.searchUserText,
      setSearchUser: state.setSearchUser,
    }))
  );
  const timerRef = useRef<any>(null);
  const [searchResult, setSearchResult] = useState([]);
  const [noResultFound, setNoResultFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!timerRef.current && searchUserText.length > 0) {
      timerRef.current = setTimeout(async () => {
        try {
          setIsLoading(true);
          const res = await userSearch(searchUserText);
          if (res.users) {
            setSearchResult(res.users);
            setNoResultFound(false);
          } else {
            setNoResultFound(true);
          }
          clearTimeout(timerRef.current);
          timerRef.current = null;
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }, 1000);
    }
  }, [searchUserText]);

  if (noResultFound)
    return (
      <FullScreenView>
        <NoSearchResultFound />
      </FullScreenView>
    );

  return (
    <FullScreenView>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.listContent}>
            <ActivityIndicator
              size='large'
              color={Color.secondary.default}
            />
          </View>
        ) : (
          <FlashList
            data={searchResult}
            renderItem={({ item }: { item: any }) => (
              <SearchUserResultCard
                userId={item?._id}
                name={item?.name}
                avatar={item?.avatar}
              />
            )}
            estimatedItemSize={60}
            ListEmptyComponent={SearchEmptyComponent}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </FullScreenView>
  );
};

export default SearchUser;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  listContent: {
    paddingVertical: 20,
  },
});
