import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface TabProps {
  label: string;
  value: string | number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export interface TabsProps {
  value: string | number;
  onChange: (value: string | number) => void;
  children: React.ReactElement<TabProps>[];
  variant?: 'standard' | 'fullWidth' | 'scrollable';
  indicatorColor?: 'primary' | 'secondary';
  textColor?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}

export const Tab: React.FC<TabProps> = ({ 
  label, 
  value, 
  disabled = false, 
  style, 
  labelStyle,
  children 
}) => {
  return (
    <View style={style}>
      <Text style={labelStyle}>{label}</Text>
      {children}
    </View>
  );
};

export const Tabs: React.FC<TabsProps> = ({
  value,
  onChange,
  children,
  variant = 'standard',
  indicatorColor = 'primary',
  textColor = 'primary',
  style,
}) => {
  const { theme } = useTheme();
  const scrollViewRef = React.useRef<ScrollView>(null);
  
  const getIndicatorColor = () => {
    return indicatorColor === 'primary' 
      ? theme.palette.primary.main 
      : theme.palette.secondary.main;
  };
  
  const getTextColor = (isSelected: boolean) => {
    if (isSelected) {
      return textColor === 'primary' 
        ? theme.palette.primary.main 
        : theme.palette.secondary.main;
    }
    return theme.palette.text.primary;
  };
  
  const tabsStyles = StyleSheet.create({
    container: {
      width: '100%',
    } as ViewStyle,
    tabsContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.divider,
    } as ViewStyle,
    scrollable: {
      maxWidth: '100%',
    } as ViewStyle,
    tab: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      minWidth: variant === 'scrollable' ? 90 : variant === 'fullWidth' ? 0 : 90,
      flex: variant === 'fullWidth' ? 1 : 0,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    tabText: {
      ...theme.typography.button,
    } as TextStyle,
    indicator: {
      position: 'absolute',
      bottom: 0,
      height: 2,
      backgroundColor: getIndicatorColor(),
    } as ViewStyle,
    disabled: {
      opacity: 0.5,
    } as ViewStyle,
  });

  return (
    <View style={[tabsStyles.container, style]}>
      {variant === 'scrollable' ? (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tabsStyles.scrollable}
          contentContainerStyle={tabsStyles.tabsContainer}
        >
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return null;
            
            const tabValue = child.props.value;
            const isSelected = tabValue === value;
            const isDisabled = child.props.disabled;
            
            return (
              <Pressable
                key={index}
                style={[
                  tabsStyles.tab,
                  isDisabled && tabsStyles.disabled,
                  child.props.style,
                ]}
                onPress={() => !isDisabled && onChange(tabValue)}
                disabled={isDisabled}
              >
                <Text
                  style={[
                    tabsStyles.tabText,
                    { color: getTextColor(isSelected) },
                    child.props.labelStyle,
                  ]}
                >
                  {child.props.label}
                </Text>
                {isSelected && (
                  <View
                    style={[
                      tabsStyles.indicator,
                      { left: 0, right: 0 },
                    ]}
                  />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      ) : (
        <View style={tabsStyles.tabsContainer}>
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return null;
            
            const tabValue = child.props.value;
            const isSelected = tabValue === value;
            const isDisabled = child.props.disabled;
            
            return (
              <Pressable
                key={index}
                style={[
                  tabsStyles.tab,
                  isDisabled && tabsStyles.disabled,
                  child.props.style,
                ]}
                onPress={() => !isDisabled && onChange(tabValue)}
                disabled={isDisabled}
              >
                <Text
                  style={[
                    tabsStyles.tabText,
                    { color: getTextColor(isSelected) },
                    child.props.labelStyle,
                  ]}
                >
                  {child.props.label}
                </Text>
                {isSelected && (
                  <View
                    style={[
                      tabsStyles.indicator,
                      { left: 0, right: 0 },
                    ]}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default { Tabs, Tab };
