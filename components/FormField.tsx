import type { StyleProp, TextStyle } from 'react-native';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import { useState } from 'react';

type AllowedKeyboardTypes =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'url'
  | 'phone-pad';

interface Props {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  keyboardType?: AllowedKeyboardTypes;
  containerStyle?: object;
}

const FormField = ({
  value,
  placeholder,
  onChangeText,
  keyboardType,
  containerStyle,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const inputStyle: StyleProp<TextStyle>[] = [styles.input];

  if (value) {
    inputStyle.push({ opacity: 1 });
  }
  if (placeholder.toLocaleLowerCase().includes('password')) {
    inputStyle.push(styles.secureInput);
  }
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputWrapper]}>
        <TextInput
          style={inputStyle}
          value={value}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={Color.gray.oneHundred}
          onChangeText={onChangeText}
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={
            placeholder.toLocaleLowerCase().includes('password') &&
            !showPassword
          }
          autoCapitalize='none'
        />
        {placeholder.toLocaleLowerCase().includes('password') && (
          <Pressable
            onPress={handlePassword}
            style={styles.showPassword}
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={15}
              color={Color.gray.oneHundred}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth * 0.8,
    height:50,
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    minHeight: 50,
    paddingHorizontal: 10,
    backgroundColor: Color.black.twoHundred,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
  },
  input: {
    width: '100%',
    height: '100%',
    color: Color.white,
    fontFamily: Font.pRegular,
    opacity: 0.5,
    borderRadius: 8,
  },
  showPassword: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureInput: {
    width: '91%',
  },
});
