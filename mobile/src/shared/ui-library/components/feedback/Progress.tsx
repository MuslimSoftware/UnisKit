import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ProgressVariant, ProgressColor } from '../../theme/types';

export interface ProgressProps {
  variant?: ProgressVariant;
  value?: number;
  color?: ProgressColor;
  thickness?: number;
  style?: StyleProp<ViewStyle>;
}

const Progress: React.FC<ProgressProps> = ({
  variant = 'indeterminate',
  value = 0,
  color = 'primary',
  thickness = 4,
  style,
}) => {
  const { theme } = useTheme();
  const [animatedValue, setAnimatedValue] = React.useState(0);
  
  React.useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) % 2000 / 2000;
      setAnimatedValue(progress);
      animationFrame = requestAnimationFrame(animate);
    };
    
    if (variant === 'indeterminate') {
      animationFrame = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [variant]);
  
  const getProgressWidth = () => {
    if (variant === 'determinate') {
      return `${Math.min(100, Math.max(0, value))}%`;
    }
    
    // For indeterminate, create a moving effect
    return '30%';
  };
  
  const getTranslateX = () => {
    if (variant === 'indeterminate') {
      // Move from -100% to 100% for indeterminate
      return `${-100 + animatedValue * 200}%`;
    }
    return '0%';
  };
  
  const progressStyles = StyleSheet.create({
    container: {
      width: '100%',
      height: thickness,
      backgroundColor: theme.palette.divider,
      borderRadius: thickness / 2,
      overflow: 'hidden',
    } as ViewStyle,
    bar: {
      height: '100%',
      width: getProgressWidth(),
      backgroundColor: theme.palette[color].main,
      borderRadius: thickness / 2,
      transform: [{ translateX: getTranslateX() as any }],
    } as ViewStyle,
  });

  return (
    <View style={[progressStyles.container, style]}>
      <View style={progressStyles.bar} />
    </View>
  );
};

export default Progress;
