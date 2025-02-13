import { PropsWithChildren, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { TextBody } from './typography'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useTheme } from '@/hooks/theme'

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const theme = useTheme()

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <TextBody style={styles.title}>{title}</TextBody>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.colors.text}
        />
      </TouchableOpacity>
      {isExpanded && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    flex: 1,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
})
