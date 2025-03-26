import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface ThemeToggleProps {
  style?: any
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const { mode, toggleTheme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      ...style,
    },
    toggle: {
      flexDirection: 'row',
      backgroundColor: mode === 'light' ? '#e0e0e0' : '#333333',
      borderRadius: 16,
      padding: 2,
      width: 72,
      height: 32,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    option: {
      width: 34,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeOption: {
      backgroundColor: mode === 'light' ? '#ffffff' : '#555555',
    },
    icon: {
      fontSize: 16,
      color: mode === 'light' ? '#333333' : '#ffffff',
    },
    label: {
      marginLeft: 8,
      fontSize: 14,
      color: mode === 'light' ? '#333333' : '#ffffff',
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggle}
        onPress={toggleTheme}
        activeOpacity={0.8}
      >
        <View style={[styles.option, mode === 'light' && styles.activeOption]}>
          <Text style={styles.icon}>☀️</Text>
        </View>
        <View style={[styles.option, mode === 'dark' && styles.activeOption]}>
          <Text style={styles.icon}>🌙</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>
        {mode === 'light' ? 'Light' : 'Dark'} Mode
      </Text>
    </View>
  )
}

export default ThemeToggle
