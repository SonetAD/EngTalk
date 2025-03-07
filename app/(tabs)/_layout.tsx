import { Tabs } from 'expo-router';
import { Color } from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/features/auth/authSlice';
import LocalStore from '@/libs/localStore';
import ProfileHeaderComponent from '@/components/ProfileHeaderComponent';
import HomeHeaderComponent from '@/components/HomeHeaderComponent';
import ExploreHeaderComponent from '@/components/ExploreHeaderComponents';

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
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const userName = LocalStore.getString('userName');
    const password = LocalStore.getString('passWord');
    if (userName && password) {
      dispatch(loginUser({ userName, password }));
    }
  }, []);

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
          header: ExploreHeaderComponent,

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
          headerShown: false,
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
          header: () => (
            <ProfileHeaderComponent userName={user.userInfo.userName} />
          ),
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
    </Tabs>
  );
};

export default TabLayout;
