import { Stack } from 'expo-router'
import { useTheme } from '@/hooks/theme'

export default function StackLayout() {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        presentation: 'modal',
        animation: 'default',
      }}
    >
      <Stack.Screen
        name="settings"
        options={{
          presentation: 'modal',
          animation: 'default',
        }}
      />
    </Stack>
  )
}
