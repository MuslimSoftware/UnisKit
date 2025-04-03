import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useTheme } from '@/shared/context/ThemeContext';
import { FgView } from '@/shared/components/layout';
import { TextBody } from '@/shared/components/text';
import { paddings, gaps, borderRadii } from '@/shared/theme/spacing';
import { SettingsPageLayout } from '@/features/settings/components/SettingsPageLayout';
import { ThemeCard } from '@/features/settings/components/ThemeCard';
import { lightTheme, darkTheme } from '@/shared/theme/theme';
import { Switch } from '@/shared/components/forms/Switch';

export default function ThemeSettingsScreen() {
  const { theme, isDark, themePreference, setThemePreference } = useTheme();
  const systemColorScheme = useColorScheme();

  const handleSelectTheme = (selectedPreference: 'light' | 'dark') => {
    setThemePreference(selectedPreference);
  };

  const handleSystemToggle = (useSystem: boolean) => {
    if (useSystem) {
      setThemePreference('system');
    } else {
      setThemePreference(systemColorScheme ?? 'light');
    }
  };

  const isLightSelected = themePreference === 'light';
  const isDarkSelected = themePreference === 'dark';
  const useSystemSelected = themePreference === 'system';

  return (
    <SettingsPageLayout title="Theme">
      <FgView style={styles.sectionContent}>
        <View style={styles.toggleRow}>
          <TextBody>Use System Setting</TextBody>
          <Switch 
            onValueChange={handleSystemToggle}
            value={useSystemSelected}
          />
        </View>
      </FgView>
      {/* Explicit Theme Choices - Only show if system is OFF */}
      {!useSystemSelected && (
        <View style={styles.cardContainer}>
          <ThemeCard 
            theme={lightTheme}
            isThemeDark={false}
            isSelected={isLightSelected}
            onPress={() => handleSelectTheme('light')}
          />
          <ThemeCard 
            theme={darkTheme}
            isThemeDark={true}
            isSelected={isDarkSelected}
            onPress={() => handleSelectTheme('dark')}
          />
        </View>
      )}
    </SettingsPageLayout>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    gap: gaps.large,
    paddingHorizontal: paddings.small,
  },
  sectionContent: {
    borderRadius: borderRadii.large,
    overflow: 'hidden',
    padding: paddings.large,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 