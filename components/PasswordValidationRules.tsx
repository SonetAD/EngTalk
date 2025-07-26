import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/color';
import Font from '@/constants/font';
import { DeviceWidth } from '@/constants/dimensions';

interface PasswordValidationRulesProps {
  password: string;
}

const PasswordValidationRules: React.FC<PasswordValidationRulesProps> = ({
  password,
}) => {
  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  // Animation refs for each rule
  const scaleAnims = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  const rules = [
    {
      text: '8+ characters',
      isValid: hasMinLength,
      animIndex: 0,
    },
    {
      text: '1 number',
      isValid: hasNumber,
      animIndex: 1,
    },
    {
      text: '1 special char',
      isValid: hasSpecialChar,
      animIndex: 2,
    },
    {
      text: 'Upper & lowercase',
      isValid: hasLowercase && hasUppercase,
      animIndex: 3,
    },
  ];

  // Animate when a rule becomes valid
  useEffect(() => {
    rules.forEach((rule, index) => {
      if (rule.isValid) {
        Animated.sequence([
          Animated.timing(scaleAnims[rule.animIndex], {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnims[rule.animIndex], {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });
  }, [password]);

  return (
    <View style={styles.container}>
      <View style={styles.rulesContainer}>
        {rules.map((rule, index) => (
          <View
            key={index}
            style={styles.ruleRow}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleAnims[rule.animIndex] }] }}
            >
              <Ionicons
                name={rule.isValid ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={rule.isValid ? '#10B981' : Color.gray.oneHundred}
                style={styles.checkIcon}
              />
            </Animated.View>
            <Text
              style={[styles.ruleText, rule.isValid && styles.ruleTextValid]}
            >
              {rule.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth * 0.8,
    marginTop: 8,
    marginBottom: 12,
  },
  rulesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 4,
  },
  checkIcon: {
    marginRight: 6,
  },
  ruleText: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 11,
    flex: 1,
  },
  ruleTextValid: {
    color: Color.white,
    fontFamily: Font.pMedium,
  },
});

export default PasswordValidationRules;
