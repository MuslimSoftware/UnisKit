import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const makeStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styles: T | ((theme: any) => T)
) => {
  return () => {
    const { theme } = useTheme();
    const styleObject = typeof styles === 'function' ? styles(theme) : styles;
    return StyleSheet.create(styleObject);
  };
};
