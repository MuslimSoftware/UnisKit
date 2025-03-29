import React, { useRef, useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Pressable, Animated } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { ThemedText } from '@/shared/components/text'
import { spacing, scale } from '@/shared/theme/spacing'

interface OtpInputProps {
  value: string
  onChangeText: (text: string) => void
  digitCount?: number
  error?: boolean
  // Add other necessary props like onSubmitEditing if needed
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChangeText,
  digitCount = 6,
  error = false,
}) => {
  const { theme } = useTheme()
  const inputRef = useRef<TextInput>(null)
  const [isFocused, setIsFocused] = useState(false)
  const cursorOpacity = useRef(new Animated.Value(0)).current

  const handlePress = () => {
    inputRef.current?.focus()
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  // Blinking cursor animation
  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null
    if (isFocused) {
      // Start blinking instantly
      cursorOpacity.setValue(1) // Ensure it starts visible
      animation = Animated.loop(
        Animated.sequence([
          // Stay visible for 500ms
          Animated.delay(500),
          // Instantly disappear
          Animated.timing(cursorOpacity, {
            toValue: 0,
            duration: 0, // Instant change
            useNativeDriver: true,
          }),
          // Stay invisible for 500ms
          Animated.delay(500),
          // Instantly appear
          Animated.timing(cursorOpacity, {
            toValue: 1,
            duration: 0, // Instant change
            useNativeDriver: true,
          }),
        ]),
      )
      animation.start()
    } else {
      cursorOpacity.setValue(0) // Ensure hidden when not focused
    }

    return () => {
      // Cleanup animation
      if (animation) {
        animation.stop()
      }
      cursorOpacity.setValue(0)
    }
  }, [isFocused, cursorOpacity])

  // Create an array based on digitCount for mapping
  const digits = Array.from({ length: digitCount })

  return (
    <View style={styles.container}>
      {/* Hidden TextInput */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        maxLength={digitCount}
        keyboardType="number-pad"
        autoFocus={true} // Auto focus the hidden input
        caretHidden // Hide the caret visually if possible
        onFocus={handleFocus}
        onBlur={handleBlur}
        // Style to hide it completely
        style={styles.hiddenInput}
        // Consider adding accessibility labels
      />

      {/* Display Boxes */}
      <Pressable style={styles.displayContainer} onPress={handlePress}>
        {digits.map((_, index) => {
          const digit = value[index] || ''
          const isCurrentDigit = index === value.length
          const isActive = isFocused && isCurrentDigit

          const boxStyle = [
            styles.box,
            {
              borderColor: error
                ? theme.colors.indicators.error
                : isActive
                  ? theme.colors.text.primary
                  : theme.colors.layout.border,
              backgroundColor: theme.colors.layout.background,
            },
          ]

          return (
            <View key={index} style={boxStyle}>
              <ThemedText
                style={[styles.boxText, { color: theme.colors.text.primary }]}
              >
                {digit}
              </ThemedText>
              {isActive && (
                <Animated.View
                  style={[
                    styles.cursor,
                    {
                      opacity: cursorOpacity,
                      backgroundColor: theme.colors.layout.foreground,
                    },
                  ]}
                />
              )}
            </View>
          )
        })}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center', // Center the display container
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  displayContainer: {
    flexDirection: 'row',
    gap: scale.sm, // Add gap between boxes
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', // Center the row of boxes
  },
  box: {
    flex: 1, // Allow boxes to share space
    maxWidth: scale.xxl + scale.sm, // Prevent boxes from getting too wide
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: spacing.input.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cursor: {
    position: 'absolute',
    width: 2,
    height: '40%',
  },
})
