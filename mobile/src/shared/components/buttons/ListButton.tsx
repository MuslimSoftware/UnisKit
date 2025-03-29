import React from 'react'
import {
  View,
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { TextBody } from '@/shared/components/text'
import { paddings, gaps } from '@/shared/theme/spacing'
import { iconSizes } from '@/shared/theme/sizes'

// Define IoniconName type locally or import if shared
type IoniconName = keyof typeof Ionicons.glyphMap

export interface ListButtonProps extends PressableProps {
  label: string
  icon?: IoniconName // Optional icon
  style?: StyleProp<ViewStyle>
  showChevron?: boolean // Whether to show the right chevron
  iconColor?: string // Optional override for icon color
  labelColor?: string // Optional override for label color
  chevronColor?: string // Optional override for chevron color
}

export const ListButton = ({
  label,
  icon,
  style,
  onPress,
  showChevron = true, // Default to true
  iconColor,
  labelColor,
  chevronColor,
  ...props // Pass other Pressable props
}: ListButtonProps) => {
  const { theme } = useTheme()

  // Determine colors based on props or theme defaults
  const finalIconColor = iconColor || theme.colors.text.primary
  const finalLabelColor = labelColor || theme.colors.text.primary
  const finalChevronColor = chevronColor || theme.colors.text.secondary

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
        ,
        style, // Apply external styles
      ]}
      onPress={onPress}
      {...props}
    >
      {/* Left side content: Icon and Label */}
      <View style={styles.contentLeft}>
        {icon && (
          <Ionicons
            name={icon}
            size={iconSizes.small}
            color={finalIconColor}
            style={styles.icon}
          />
        )}
        <TextBody style={[styles.label, { color: finalLabelColor }]}>
          {label}
        </TextBody>
      </View>

      {/* Right side content: Chevron */}
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={iconSizes.xsmall}
          color={finalChevronColor}
        />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: paddings.medium,
    paddingVertical: paddings.medium,
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gaps.medium,
    flex: 1,
    marginRight: gaps.small,
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    flex: 1,
  },
})
