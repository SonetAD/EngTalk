import { Tabs } from 'expo-router';
import { Color } from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef } from 'react';
import LocalStore from '@/libs/localStore';
import ProfileHeaderComponent from '@/components/ProfileHeaderComponent';
import HomeHeaderComponent from '@/components/HomeHeaderComponent';
import ExploreHeaderComponent from '@/components/ExploreHeaderComponents';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import LeaderBoardHeaderComponent from '@/components/LeaderBoardHeaderComponent';
import { NotificationSocket } from '@/libs/Socket';

type AllowedIcons = 'home' | 'person-circle' | 'trophy' | 'earth';

interface Props {
  name: AllowedIcons;
  color: string;
  focused: boolean;
  size: number;
}
const TabIcon = ({ name, color, focused, size }: Props) => {
  if (focused) {
    return (
      <Ionicons
        name={name}
        size={size}
        color={color}
      />
    );
  }

  return (
    <Ionicons
      name={`${name}-outline`}
      size={size}
      color={color}
    />
  );
};

const TabLayout = () => {
  const {
    userName,
    token,
    otherUserName,
    setUser,
    getVoiceBite,
    getUserStat,
    setInbox,
  } = useCentralStore(
    useShallow((state) => ({
      userName: state.user.userInfo.userName,
      token: state.user.token,
      otherUserName: state.otherUser.userName,
      setUser: state.setUser,
      getVoiceBite: state.getVoiceBite,
      getUserStat: state.getUserStat,
      setInbox: state.setInbox,
    }))
  );

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const recordPopUp = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    const userName = LocalStore.getString('userName');
    const password = LocalStore.getString('passWord');
    if (userName && password) {
      setUser({ userName, password });
    }
  }, []);

  useEffect(() => {
    if (userName) {
      getVoiceBite();
      getUserStat();
    }
  }, [userName]);

  useEffect(() => {
    if (token) {
      setInbox();
      NotificationSocket.on('message', () => {
        setInbox();
      });
    }
    return () => {
      NotificationSocket.off('message');
    };
  }, [token]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Color.secondary.twoHundred,
        tabBarInactiveTintColor: Color.gray.oneHundred,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Color.primary,
          borderTopWidth: 0.3,
          borderTopColor: Color.black.twoHundred,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          header: HomeHeaderComponent,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name='home'
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='(explore)'
        options={{
          title: 'Explore',
          header: () => (
            <ExploreHeaderComponent
              reference={bottomSheetModalRef}
              recordPopUp={recordPopUp}
            />
          ),

          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name='earth'
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='LeaderBoard'
        options={{
          title: 'Leaderboard',
          header: LeaderBoardHeaderComponent,

          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name='trophy'
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='(profile)'
        options={{
          title: 'Profile',
          header: () => <ProfileHeaderComponent userName={userName} />,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name='person-circle'
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='OtherProfile'
        options={{
          href: null,
          header: () => (
            <ProfileHeaderComponent
              userName={otherUserName}
              otherUser={true}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
