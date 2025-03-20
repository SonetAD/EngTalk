import { StyleSheet, SafeAreaView } from 'react-native';
import { Color } from '@/constants/constants';
import { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

const FullScreenView = ({ children }: Props) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default FullScreenView;

const styles = StyleSheet.create({
  container: {
    flex:1,
    height: '100%',
    width: '100%',
    backgroundColor: Color.primary,
  },
});
