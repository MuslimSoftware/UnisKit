import { Theme } from '@/shared/theme/theme'; // Import base Theme type

// Define the possible preference values
export type ThemePreference = 'light' | 'dark' | 'system';

// Define the shape of the Theme Context
export type ThemeContextType = {
  theme: Theme; // The currently active theme object
  isDark: boolean; // Whether the active theme is dark
  themePreference: ThemePreference; // The user's stored preference
  setThemePreference: (preference: ThemePreference) => void; // Function to update preference
}; 