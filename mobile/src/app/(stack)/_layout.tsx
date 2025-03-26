import { Stack } from 'expo-router'
import { useTheme } from '@/shared/context/ThemeContext'

export default function StackLayout() {
  const { theme } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.palette.background.default },
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
