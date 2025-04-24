import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Followers from './followers';
import Following from './following';
import { Color, Font } from '@/constants/constants';

const TopTab = createMaterialTopTabNavigator();

const FollowTab = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Color.primary,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          color: 'white',
          fontFamily: Font.pRegular,
        },
      }}
    >
      <TopTab.Screen
        name='followers'
        component={Followers}
      />
      <TopTab.Screen
        name='following'
        component={Following}
      />
    </TopTab.Navigator>
  );
};

export default FollowTab;
