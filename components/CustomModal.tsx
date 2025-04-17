import { StyleSheet } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
  setVisibility: (isVisible: boolean) => void;
}
const CustomModal = ({ children, isVisible, setVisibility }: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setVisibility(false)}
      onBackButtonPress={() => setVisibility(false)}
      animationIn='fadeIn'
      animationOut='fadeOut'
      backdropOpacity={0.5}
      style={styles.modal}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
