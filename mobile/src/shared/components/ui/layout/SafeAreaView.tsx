import React from 'react'
import { ViewProps as RNViewProps, StyleProp, ViewStyle } from 'react-native'
import {
  SafeAreaView as RNSafeAreaView,
  Edge,
  SafeAreaViewProps as RNSafeAreaViewProps,
} from 'react-native-safe-area-context'
import { View } from './View'
import { useTheme } from '@/shared/hooks/useTheme'
import { ThemeProps, SpacingProps } from '@/shared/types/theme'

// Define valid spacing keys to use for shorthand props
type SpacingKey =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'

export interface SafeAreaViewProps
  extends Omit<RNSafeAreaViewProps, 'edges'>,
    ThemeProps {
  children?: React.ReactNode
  top?: boolean
  bottom?: boolean
  edges?: Edge[]
  padding?: SpacingKey | number
  margin?: SpacingKey | number
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
  top = true,
  bottom = true,
  edges,
  bg, // background color from theme
  padding,
  margin,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  ...rest
}) => {
  const { theme } = useTheme()

  // Determine which edges to apply
  const safeAreaEdges =
    edges ||
    (top && bottom
      ? (['top', 'bottom', 'left', 'right'] as Edge[])
      : top
      ? (['top', 'left', 'right'] as Edge[])
      : bottom
      ? (['bottom', 'left', 'right'] as Edge[])
      : (['left', 'right'] as Edge[]))

  // Style for safe area
  const safeAreaStyle: StyleProp<ViewStyle> = [
    bg && { backgroundColor: theme.colors[bg] },
    style,
  ]

  return (
    <RNSafeAreaView style={safeAreaStyle} edges={safeAreaEdges} {...rest}>
      <View
        bg={bg}
        padding={padding}
        margin={margin}
        m={m}
        mt={mt}
        mr={mr}
        mb={mb}
        ml={ml}
        mx={mx}
        my={my}
        p={p}
        pt={pt}
        pr={pr}
        pb={pb}
        pl={pl}
        px={px}
        py={py}
      >
        {children}
      </View>
    </RNSafeAreaView>
  )
}

SafeAreaView.displayName = 'SafeAreaView'
