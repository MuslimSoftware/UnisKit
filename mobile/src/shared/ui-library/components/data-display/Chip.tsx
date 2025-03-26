import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface ChipProps {
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  disabled?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  color = 'default',
  variant = 'filled',
  size = 'medium',
  disabled = false,
  onDelete,
  onClick,
  avatar,
  icon,
  style,
  labelStyle,
}) => {
  const { theme } = useTheme();
  
  const getBackgroundColor = () => {
    if (disabled) return theme.palette.text.disabled;
    if (variant === 'outlined') return 'transparent';
    
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'error':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      case 'success':
        return theme.palette.success.main;
      default:
        return theme.palette.background.paper;
    }
  };
  
  const getTextColor = () => {
    if (disabled) return theme.palette.text.disabled;
    if (variant === 'outlined') {
      switch (color) {
        case 'primary':
          return theme.palette.primary.main;
        case 'secondary':
          return theme.palette.secondary.main;
        case 'error':
          return theme.palette.error.main;
        case 'warning':
          return theme.palette.warning.main;
        case 'info':
          return theme.palette.info.main;
        case 'success':
          return theme.palette.success.main;
        default:
          return theme.palette.text.primary;
      }
    }
    
    switch (color) {
      case 'primary':
      case 'secondary':
      case 'error':
      case 'warning':
      case 'info':
      case 'success':
        return theme.palette.background.paper;
      default:
        return theme.palette.text.primary;
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return theme.palette.text.disabled;
    if (variant === 'outlined') {
      switch (color) {
        case 'primary':
          return theme.palette.primary.main;
        case 'secondary':
          return theme.palette.secondary.main;
        case 'error':
          return theme.palette.error.main;
        case 'warning':
          return theme.palette.warning.main;
        case 'info':
          return theme.palette.info.main;
        case 'success':
          return theme.palette.success.main;
        default:
          return theme.palette.divider;
      }
    }
    return 'transparent';
  };
  
  const getHeight = () => {
    return size === 'small' ? 24 : 32;
  };
  
  const styles = StyleSheet.create({
    chip: {
      height: getHeight(),
      borderRadius: getHeight() / 2,
      backgroundColor: getBackgroundColor(),
      borderWidth: variant === 'outlined' ? 1 : 0,
      borderColor: getBorderColor(),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      opacity: disabled ? 0.5 : 1,
      ...style,
    },
    avatar: {
      marginLeft: -6,
      marginRight: 6,
    },
    icon: {
      marginRight: 6,
    },
    label: {
      color: getTextColor(),
      fontSize: size === 'small' ? 12 : 14,
      ...labelStyle,
    },
    deleteIcon: {
      marginLeft: 4,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteIconText: {
      color: getTextColor(),
      fontSize: 12,
      lineHeight: 16,
    },
  });

  const ChipContent = () => (
    <>
      {avatar && <View style={styles.avatar}>{avatar}</View>}
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.label}>{label}</Text>
      {onDelete && (
        <TouchableOpacity 
          style={styles.deleteIcon} 
          onPress={disabled ? undefined : onDelete}
          disabled={disabled}
        >
          <Text style={styles.deleteIconText}>×</Text>
        </TouchableOpacity>
      )}
    </>
  );

  if (onClick) {
    return (
      <TouchableOpacity 
        style={styles.chip} 
        onPress={disabled ? undefined : onClick}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <ChipContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.chip}>
      <ChipContent />
    </View>
  );
};

export default Chip;
