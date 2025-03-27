import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, Text } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
export default function TabLayout() {
  const { theme } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.brand.primary,
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
            <Text>Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="person.circle.fill" color={color} />
            <Text>Profile</Text>
          ),
        }}
      />
    </Tabs>
  )
}
