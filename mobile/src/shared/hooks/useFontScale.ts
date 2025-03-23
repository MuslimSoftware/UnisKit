import { useEffect, useState } from 'react';
import { AccessibilityInfo, PixelRatio } from 'react-native';

/**
 * Hook to get the current font scale from the user's device settings.
 * This allows your UI to respond to the user's font size preferences.
 * @returns The current font scale factor
 */
export function useFontScale(): number {
  // Start with the current pixel ratio font scale
  const [fontScale, setFontScale] = useState(() => PixelRatio.getFontScale());

  useEffect(() => {
    // Listen for font scale changes
    const subscription = AccessibilityInfo.addEventListener(
      'boldTextChanged',
      // When font settings change, get the updated font scale
      () => {
        setFontScale(PixelRatio.getFontScale());
      }
    );

    // Clean up the listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return fontScale;
} 