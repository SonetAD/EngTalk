import { StatusBar } from 'expo-status-bar';
import { Color } from '@/constants/constants';

const CustomStatusBar = () => {
  return (
    <StatusBar
      backgroundColor={Color.primary}
      style='light'
    />
  );
};

export default CustomStatusBar;
