import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface StackProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  spacing?: number;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({
  direction = 'column',
  spacing = 0,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  style,
  children,
}) => {
  const { theme } = useTheme();
  
  const getSpacing = () => {
    return theme.spacing(spacing);
  };
  
  const styles = StyleSheet.create({
    stack: {
      display: 'flex',
      flexDirection: direction,
      justifyContent,
      alignItems,
      gap: getSpacing(),
      ...style,
    },
  });

  return (
    <View style={styles.stack}>
      {children}
    </View>
  );
};

export default Stack;
