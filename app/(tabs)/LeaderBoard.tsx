import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import fetchLeaderBoard from '@/libs/api/fetchLeaderBoard';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import FullScreenView from '@/components/FullScreenView';
import TopThreeUser from '@/components/topThreeUser';
import { DeviceHeight } from '@/constants/dimensions';
import CustomLoadingPage from '@/components/CustomLoadingPage';
import { FlashList } from '@shopify/flash-list';
import LeaderboardCard from '@/components/LeaderBoardCard';
import { router } from 'expo-router';
import MyRank from '@/components/MyRank';
import { Color, Font } from '@/constants/constants';

const LeaderBoard = () => {
  const { token, userId, setOtherUser } = useCentralStore(
    useShallow((state) => ({
      userId: state.user.userInfo.userId,
      token: state.user.token,
      setOtherUser: state.setOtherUser,
    }))
  );

  const [leaderBoard, setLeaderBoard] = useState({
    position: 0,
    topUsers: [],
    totalUsersInLevel: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    fetchTopList(token);
  }, [token]);

  const fetchTopList = async (token: string) => {
    try {
      if (token) {
        const res = await fetchLeaderBoard({ token });
        setLeaderBoard({
          position: res.position,
          topUsers: res.topUsers,
          totalUsersInLevel: res.totalUsersInLevel,
        });

        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshControl = async () => {
    setIsRefreshing(true);
    await fetchTopList(token);
    setIsRefreshing(false);
  };

  const navigateToOtherProfile = (otherUserId: string) => {
    if (userId === otherUserId) {
      router.navigate('/Profile');
    } else {
      setOtherUser({ userId: otherUserId, goBackRoute: '/LeaderBoard' });
      router.push('/OtherProfile');
    }
  };

  if (isLoading) return <CustomLoadingPage />;

  return (
    <FullScreenView>
      <FlashList
        ListHeaderComponent={() => (
          <View>
            <TopThreeUser
              userList={leaderBoard.topUsers.slice(0, 3)}
              viewProfile={navigateToOtherProfile}
            />
            <MyRank rank={leaderBoard.position} />
            <Text style={styles.topTen}>The Best of the Best 10</Text>
          </View>
        )}
        data={leaderBoard.topUsers}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <LeaderboardCard
            avatar={item?.avatar}
            rank={index + 1}
            name={item?.name}
            userId={item?._id}
            gender={item?.gender}
            totalTrophy={item?.totalTrophy}
            viewProfile={navigateToOtherProfile}
          />
        )}
        estimatedItemSize={50}
        onRefresh={refreshControl}
        refreshing={isRefreshing}
      />
    </FullScreenView>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    marginTop: DeviceHeight * 0.1,
    height: DeviceHeight,
  },
  topTen: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  marginBottom: 10
  },
});
