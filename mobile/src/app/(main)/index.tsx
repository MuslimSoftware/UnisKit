import { StyleSheet, Platform, View, ScrollView } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TextBody, TextHeader } from '@/shared/components/text'
import { Ionicons } from '@expo/vector-icons'
import { Column, BaseColumn } from '@/shared/components/layout'
import { scale } from '@/shared/theme/spacing'

export default function HomeScreen() {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()

  const TAB_BAR_HEIGHT = 60
  const defaultPadding = 24

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.layout.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop:
              insets.top + (theme.spacing.section.padding ?? defaultPadding),
            paddingBottom:
              Platform.OS === 'ios'
                ? insets.bottom + TAB_BAR_HEIGHT
                : insets.bottom +
                  (theme.spacing.section.padding ?? defaultPadding),
          },
        ]}
      >
        <BaseColumn style={styles.content} gap={scale.lg}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="home"
              size={64}
              color={theme.colors.brand.primary}
              style={{ opacity: 0.8 }}
            />
          </View>

          <View style={styles.section}>
            <TextHeader style={styles.title}>Thank You!</TextHeader>
            <TextBody
              style={[
                styles.description,
                { color: theme.colors.text.secondary },
              ]}
            >
              Thanks for using my React Native template. This template includes:
            </TextBody>
            <BaseColumn style={styles.features} gap={scale.sm}>
              <TextBody style={{ color: theme.colors.text.secondary }}>
                • Beautiful dark/light theme
              </TextBody>
              <TextBody style={{ color: theme.colors.text.secondary }}>
                • Type-safe navigation
              </TextBody>
              <TextBody style={{ color: theme.colors.text.secondary }}>
                • Authentication flow
              </TextBody>
              <TextBody style={{ color: theme.colors.text.secondary }}>
                • Consistent styling system
              </TextBody>
              <TextBody style={{ color: theme.colors.text.secondary }}>
                • iOS & Android support
              </TextBody>
            </BaseColumn>
          </View>

          <View
            style={[
              styles.section,
              { backgroundColor: theme.colors.layout.background },
            ]}
          >
            <TextBody style={styles.tip}>
              💡 Start by modifying the files in the{' '}
              <TextBody style={{ color: theme.colors.brand.primary }}>
                app/
              </TextBody>{' '}
              directory to build your app!
            </TextBody>
          </View>
        </BaseColumn>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  section: {
    padding: 20,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: scale.sm,
  },
  description: {
    textAlign: 'center',
    marginBottom: scale.md,
  },
  features: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  tip: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: scale.sm,
  },
})
