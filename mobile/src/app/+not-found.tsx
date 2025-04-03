import React from 'react'
import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { PrimaryButton } from '@/shared/components/buttons'

export default function NotFoundScreen() {
  const { theme } = useTheme()
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <PrimaryButton onPress={() => {}} label="Go to home screen!" />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
})
