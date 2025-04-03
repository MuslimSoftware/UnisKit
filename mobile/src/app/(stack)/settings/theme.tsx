import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/shared/context/ThemeContext';
import { paddings, gaps, borderRadii } from '@/shared/theme/spacing';
import { SettingsPageLayout } from '@/features/settings/components/SettingsPageLayout';
import { ThemeCard } from '@/features/settings/components/ThemeCard';
import { lightTheme, darkTheme } from '@/shared/theme/theme';

export default function ThemeSettingsScreen() {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleSelectTheme = (selectedThemeIsDark: boolean) => {
    if (isDark !== selectedThemeIsDark) {
      toggleTheme();
    }
  };

  return (
    <SettingsPageLayout title="Theme">
      <View style={styles.cardContainer}>
        <ThemeCard 
          theme={lightTheme}
          isThemeDark={false}
          isSelected={!isDark}
          onPress={() => handleSelectTheme(false)}
        />

        <ThemeCard 
          theme={darkTheme}
          isThemeDark={true}
          isSelected={isDark}
          onPress={() => handleSelectTheme(true)}
        />
      </View>
    </SettingsPageLayout>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    gap: gaps.large,
    paddingHorizontal: paddings.small,
  },
}); 