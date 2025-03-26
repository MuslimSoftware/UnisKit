import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AlertSeverity } from '../../theme/types';

export interface BadgeProps {
  children: React.ReactNode;
  badgeContent?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  max?: number;
  showZero?: boolean;
  variant?: 'standard' | 'dot';
  invisible?: boolean;
  style?: StyleProp<ViewStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  badgeContent,
  color = 'primary',
  max = 99,
  showZero = false,
  variant = 'standard',
  invisible = false,
  style,
  badgeStyle,
  textStyle,
}) => {
  const { theme } = useTheme();
  
  const displayValue = () => {
    if (typeof badgeContent !== 'number') return badgeContent;
    if (badgeContent === 0 && !showZero) return null;
    return badgeContent > max ? `${max}+` : badgeContent;
  };
  
  const shouldDisplay = () => {
    if (invisible) return false;
    if (typeof badgeContent === 'number') {
      return badgeContent > 0 || (badgeContent === 0 && showZero);
    }
    return !!badgeContent;
  };
  
  const getBadgeSize = () => {
    if (variant === 'dot') return 8;
    return 20;
  };
  
  const getBackgroundColor = () => {
    return theme.palette[color].main;
  };
  
  const badgeStyles = StyleSheet.create({
    container: {
      position: 'relative' as const,
      display: 'flex' as const,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    } as ViewStyle,
    badge: {
      display: shouldDisplay() ? 'flex' : 'none',
      position: 'absolute' as const,
      top: -4,
      right: -4,
      backgroundColor: getBackgroundColor(),
      color: theme.palette[color].contrastText,
      borderRadius: variant === 'dot' ? getBadgeSize() / 2 : getBadgeSize() / 2,
      height: getBadgeSize(),
      minWidth: variant === 'dot' ? getBadgeSize() : getBadgeSize(),
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      padding: variant === 'dot' ? 0 : 2,
      zIndex: 1,
    } as ViewStyle,
    text: {
      color: theme.palette[color].contrastText,
      fontSize: 10,
      fontWeight: 'bold' as const,
      textAlign: 'center' as const,
    } as TextStyle,
  });

  return (
    <View style={[badgeStyles.container, style]}>
      {children}
      {shouldDisplay() && (
        <View style={[badgeStyles.badge, badgeStyle]}>
          {variant !== 'dot' && (
            <Text style={[badgeStyles.text, textStyle]}>{displayValue()}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Badge;
