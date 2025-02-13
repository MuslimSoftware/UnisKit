import React from 'react'
import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { ThemedView } from '@/components/ThemedView'
import { TextTitle, TextLink } from '@/components/typography'
import { Spacing } from '@/constants/Spacing'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <TextTitle>This screen doesn't exist.</TextTitle>
        <Link href="/" style={styles.link}>
          <TextLink>Go to home screen!</TextLink>
        </Link>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.padding.screen,
  },
  link: {
    marginTop: Spacing.margin.md,
    paddingVertical: Spacing.padding.button,
  },
})
