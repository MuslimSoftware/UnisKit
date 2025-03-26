import React from 'react'
import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import Typography from '@/shared/components/data-display/Typography'
import { Button } from '@/shared/components/buttons/Button'

export default function NotFoundScreen() {
  const { theme } = useTheme()
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Typography variant="h1">This screen doesn't exist.</Typography>
        <Button
          onPress={() => {}}
          variant="contained"
          children="Go to home screen!"
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
    // padding: Spacing.layout.screen,
  },
  title: {
    fontSize: 20,
    // marginTop: Spacing.spacing.medium,
    // paddingVertical: Spacing.layout.section,
  },
})
