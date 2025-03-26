import React from 'react';
import { View, Text, Modal as RNModal, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  actions?: React.ReactNode;
  fullScreen?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  titleStyle?: TextStyle;
  contentStyle?: ViewStyle;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  actions,
  fullScreen = false,
  maxWidth = 'sm',
  style,
  titleStyle,
  contentStyle,
  children,
}) => {
  const { theme } = useTheme();
  
  const getMaxWidth = () => {
    if (fullScreen) return '100%';
    
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
        return 600;
    }
  };
  
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: fullScreen ? 0 : theme.spacing(3),
    },
    dialog: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: fullScreen ? 0 : theme.shape.borderRadius,
      width: fullScreen ? '100%' : '100%',
      maxWidth: getMaxWidth(),
      height: fullScreen ? '100%' : undefined,
      maxHeight: fullScreen ? '100%' : '80%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      ...style,
    },
    title: {
      padding: theme.spacing(2),
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.divider,
    },
    titleText: {
      ...theme.typography.h6,
      color: theme.palette.text.primary,
      ...titleStyle,
    },
    content: {
      padding: theme.spacing(2),
      ...contentStyle,
    },
    actions: {
      padding: theme.spacing(1),
      borderTopWidth: 1,
      borderTopColor: theme.palette.divider,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.dialog} 
          activeOpacity={1} 
          onPress={(e) => e.stopPropagation()}
        >
          {title && (
            <View style={styles.title}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )}
          <View style={styles.content}>
            {children}
          </View>
          {actions && (
            <View style={styles.actions}>
              {actions}
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Dialog;
