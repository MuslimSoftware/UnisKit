import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onPress,
  style,
  textStyle,
  children,
}) => {
  const { theme } = useTheme();
  
  const getBackgroundColor = () => {
    if (disabled) return theme.palette.text.disabled;
    if (variant === 'contained') {
      return theme.palette[color].main;
    }
    return 'transparent';
  };
  
  const getTextColor = () => {
    if (disabled) return theme.palette.background.default;
    if (variant === 'contained') {
      return theme.palette[color].contrastText;
    }
    return theme.palette[color].main;
  };
  
  const getBorderColor = () => {
    if (disabled) return theme.palette.text.disabled;
    if (variant === 'outlined') {
      return theme.palette[color].main;
    }
    return 'transparent';
  };
  
  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 6, paddingHorizontal: 10 };
      case 'large':
        return { paddingVertical: 12, paddingHorizontal: 22 };
      default:
        return { paddingVertical: 8, paddingHorizontal: 16 };
    }
  };
  
  const buttonStyles = StyleSheet.create({
    button: {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      borderWidth: variant === 'outlined' ? 1 : 0,
      borderRadius: theme.shape.borderRadius,
      ...getPadding(),
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth ? '100%' : undefined,
      opacity: disabled ? 0.5 : 1,
      ...style,
    },
    text: {
      color: getTextColor(),
      ...theme.typography.button,
      ...textStyle,
    },
  });

  return (
    <TouchableOpacity
      style={buttonStyles.button}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={buttonStyles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;