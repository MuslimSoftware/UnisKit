import React from 'react'
import {
  View as RNView,
  TouchableOpacity as RNTouchableOpacity,
  ScrollView as RNScrollView,
  SafeAreaView as RNSafeAreaView,
} from 'react-native'
import { BaseTheme, BaseThemeProps } from './BaseTheme'

export const View = (props: BaseThemeProps) => (
  <BaseTheme as={RNView} {...props} />
)

export const TouchableOpacity = (props: BaseThemeProps) => (
  <BaseTheme as={RNTouchableOpacity} {...props} />
)

export const ScrollView = (props: BaseThemeProps) => (
  <BaseTheme as={RNScrollView} {...props} />
)

export const SafeAreaView = (props: BaseThemeProps) => (
  <BaseTheme as={RNSafeAreaView} {...props} />
)
