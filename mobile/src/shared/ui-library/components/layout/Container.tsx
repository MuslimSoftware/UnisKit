import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface ContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fixed?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 'lg',
  fixed = false,
  style,
  children,
}) => {
  const { theme } = useTheme();
  
  const getMaxWidth = () => {
    if (maxWidth === false) return undefined;
    
    switch (maxWidth) {
      case 'xs':
        return 444;
      case 'sm':
        return 600;
      case 'md':
        return 900;
      case 'lg':
        return 1200;
      case 'xl':
        return 1536;
      default:
        return undefined;
    }
  };
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      maxWidth: getMaxWidth(),
      ...style,
    },
  });

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

export default Container;
