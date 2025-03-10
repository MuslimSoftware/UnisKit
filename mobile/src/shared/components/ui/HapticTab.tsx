import React from 'react'
import { Pressable, GestureResponderEvent } from 'react-native'
import * as Haptics from 'expo-haptics'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'

export const HapticTab: React.FC<BottomTabBarButtonProps> = ({
  onPress,
  ...props
}) => {
  const handlePress = React.useCallback(
    (e: GestureResponderEvent) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
      onPress?.(e)
    },
    [onPress]
  )

  return <Pressable onPress={handlePress} {...props} />
}
