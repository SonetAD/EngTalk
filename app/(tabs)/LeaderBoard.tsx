import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import fetchLeaderBoard from '@/libs/api/fetchLeaderBoard';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import FullScreenView from '@/components/FullScreenView';

const LeaderBoard = () => {
  const { token } = useCentralStore(
    useShallow((state) => ({ token: state.user.token }))
  );

  const [leaderBoard, setLeaderBoard] = useState({
    position: 0,
    topUsers: [],
    totalUsersInLevel: 0,
  });
  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const res = await fetchLeaderBoard({ token });
          setLeaderBoard({
            position: res.position,
            topUsers: res.topUsers,
            totalUsersInLevel: res.totalUsersInLevel,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  console.log(leaderBoard);
  return (
    <FullScreenView>
      <View>
        <Text>LeaderBoard</Text>
      </View>
    </FullScreenView>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({});
