import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import FormField from '@/components/FormField';
import CustomAvatar from '@/components/CustomAvatar';
import { Color, Font } from '@/constants/constants';

const EditProfile = () => {
  const { name, userName, email, avatar } = useCentralStore(
    useShallow((state) => ({
      name: state.user.userInfo.name,
      userName: state.user.userInfo.userName,
      email: state.user.userInfo.email,
      avatar: state.user.userInfo.avatar,
    }))
  );

  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    email: '',
    password: '',
  });

  return (
    <FullScreenView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
        style={styles.keyboardAvoiding}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <CustomAvatar avatar={avatar} />
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.label}>Name</Text>
                <FormField
                  value={formData.name}
                  placeholder={name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                />

                <Text style={styles.label}>Username</Text>
                <FormField
                  value={formData.userName}
                  placeholder={userName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, userName: text })
                  }
                />

                <Text style={styles.label}>Email</Text>
                <FormField
                  value={formData.email}
                  placeholder={email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  keyboardType='email-address'
                />

                <Text style={styles.label}>Password</Text>
                <FormField
                  value={formData.password}
                  placeholder='Password'
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </FullScreenView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    color: Color.white,
    fontSize: 14,
    fontFamily: Font.pRegular,
    marginBottom: 6,
  },
});
