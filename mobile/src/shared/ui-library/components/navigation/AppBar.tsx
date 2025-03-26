import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Position } from '../../theme/types';

export interface AppBarProps {
  children?: React.ReactNode;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  color?: 'primary' | 'secondary' | 'default' | 'transparent' | 'inherit';
  elevation?: number;
  style?: StyleProp<ViewStyle>;
}

const AppBar: React.FC<AppBarProps> = ({
  children,
  position = 'fixed',
  color = 'primary',
  elevation = 4,
  style,
}) => {
  const { theme } = useTheme();
  
  const getBackgroundColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'transparent':
        return 'transparent';
      case 'inherit':
        return undefined;
      default:
        return theme.palette.background.paper;
    }
  };
  
  const getPosition = (): Position => {
    // Map web positions to React Native positions
    switch (position) {
      case 'fixed':
      case 'sticky':
        return 'absolute';
      case 'absolute':
        return 'absolute';
      case 'static':
      case 'relative':
      default:
        return 'relative';
    }
  };
  
  const appBarStyles = StyleSheet.create({
    appBar: {
      backgroundColor: getBackgroundColor(),
      position: getPosition(),
      width: '100%',
      zIndex: 1100,
      elevation: elevation,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.2,
      shadowRadius: elevation / 2,
    } as ViewStyle,
    content: {
      paddingHorizontal: 16,
      minHeight: 56,
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
  });

  return (
    <View style={[appBarStyles.appBar, style]}>
      <View style={appBarStyles.content}>
        {children}
      </View>
    </View>
  );
};

export default AppBar;
