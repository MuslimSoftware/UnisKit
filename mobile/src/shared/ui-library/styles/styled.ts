import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export interface StyleProps {
  theme: any;
}

export const styled = <P extends object>(
  Component: React.ComponentType<P>,
  styles: (theme: any) => any
) => {
  return React.forwardRef<any, P>((props: any, ref) => {
    const { theme } = useTheme();
    const styleObject = styles(theme);
    
    return React.createElement(Component, {
      ...props,
      style: [styleObject, props.style],
      ref: ref
    });
  });
};

export default styled;
