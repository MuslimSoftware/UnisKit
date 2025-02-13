import React from 'react'
import { Link, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { ThemedView } from '@/components/ThemedView'
import { TextTitle, TextLink } from '@/components/typography'
import { Spacing } from '@/constants/Spacing'
import { Button } from '@/components/Button'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <TextTitle>This screen doesn't exist.</TextTitle>
        <Button
          onPress={() => {}}
          variant="primary"
          text="Go to home screen!"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.layout.screen,
  },
  title: {
    fontSize: 20,
    marginTop: Spacing.spacing.medium,
    paddingVertical: Spacing.layout.section,
  },
})
