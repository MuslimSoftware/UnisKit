import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { TextBody } from '@/shared/components/text';
import { FgView } from '@/shared/components/layout';
import { Theme } from '@/shared/theme/theme';
import { borderRadii, gaps, paddings } from '@/shared/theme/spacing';
import { Ionicons } from '@expo/vector-icons';
import { iconSizes } from '@/shared/theme/sizes';

type ThemeCardProps = {
  theme: Theme;
  isThemeDark: boolean;
  isSelected: boolean;
  onPress: () => void;
};

export function ThemeCard({ theme, isThemeDark, isSelected, onPress }: ThemeCardProps) {
  // Determine name based on the passed prop
  const themeName = isThemeDark ? 'Dark' : 'Light';

  return (
    <Pressable onPress={onPress} style={styles.pressableContainer}>
      {({ pressed }) => (
        <FgView 
          style={{
            ...styles.card,
            backgroundColor: theme.colors.layout.foreground,
            borderColor: isSelected ? theme.colors.brand.primary : theme.colors.layout.border,
            opacity: pressed ? 0.8 : 1,
          }}
        >
          {/* Color Swatches */}
          <View style={styles.swatchContainer}>
            <View style={[styles.swatch, { backgroundColor: theme.colors.brand.primary }]} />
            <View style={[styles.swatch, { backgroundColor: theme.colors.layout.background }]} />
            <View style={[styles.swatch, { backgroundColor: theme.colors.text.primary }]} />
          </View>

          {/* Theme Name and Selection Indicator */}
          <View style={styles.footer}>
            <TextBody style={{ color: theme.colors.text.primary }}>{themeName}</TextBody>
            {isSelected && (
              <Ionicons 
                name="checkmark-circle"
                size={iconSizes.medium}
                color={theme.colors.brand.primary} 
              />
            )}
          </View>
        </FgView>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1, // Allow cards to grow and share space
  },
  card: {
    borderRadius: borderRadii.large,
    borderWidth: 2,
    padding: paddings.medium,
    gap: gaps.medium,
    overflow: 'hidden',
  },
  swatchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40, // Fixed height for swatches row
  },
  swatch: {
    flex: 1, // Make swatches share width
    borderRadius: borderRadii.small,
    marginHorizontal: gaps.xsmall, // Small gap between swatches
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: gaps.small,
  },
}); 