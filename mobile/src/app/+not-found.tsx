import React from 'react'
import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { TextTitle } from '@/shared/components/ui/typography'
import { Spacing } from '@/shared/constants/Spacing'
import { Button } from '@/shared/components/ui/Button'

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
