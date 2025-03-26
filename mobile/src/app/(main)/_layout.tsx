import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import Typography from '@/shared/components/data-display/Typography'
export default function TabLayout() {
  const { theme } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.palette.primary.main,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          android: {
            height: 60,
            paddingVertical: 10,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="house.fill" color={color} />
            <Typography variant="h1">Home</Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="person.circle.fill" color={color} />
            <Typography variant="h1">Profile</Typography>
          ),
        }}
      />
    </Tabs>
  )
}
