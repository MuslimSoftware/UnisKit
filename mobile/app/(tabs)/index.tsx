import { StyleSheet, Platform, View, ScrollView } from 'react-native'
import { ThemedView } from '@/shared/components/ui/ThemedView'
import { useTheme } from '@/shared/hooks/theme'
import { TextTitle, TextBody } from '@/shared/components/ui/typography'
import { IconSymbol } from '@/shared/components/ui/IconSymbol'
import { Spacing } from '@/constants/Spacing'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + Spacing.layout.screen,
            paddingBottom:
              Platform.OS === 'ios'
                ? insets.bottom + Spacing.navigation.tabBarHeight
                : Spacing.layout.content +
                  Spacing.navigation.androidTabBarPadding,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <IconSymbol
              name="house.fill"
              size={64}
              color={theme.colors.tint}
              style={{ opacity: 0.8 }}
            />
          </View>

          <View style={styles.section}>
            <TextTitle style={styles.title}>Thank You!</TextTitle>
            <TextBody
              style={[
                styles.description,
                { color: theme.colors.secondaryText },
              ]}
            >
              Thanks for using my React Native template. This template includes:
            </TextBody>
            <View style={styles.features}>
              <TextBody style={{ color: theme.colors.secondaryText }}>
                • Beautiful dark/light theme
              </TextBody>
              <TextBody style={{ color: theme.colors.secondaryText }}>
                • Type-safe navigation
              </TextBody>
              <TextBody style={{ color: theme.colors.secondaryText }}>
                • Authentication flow
              </TextBody>
              <TextBody style={{ color: theme.colors.secondaryText }}>
                • Consistent styling system
              </TextBody>
              <TextBody style={{ color: theme.colors.secondaryText }}>
                • iOS & Android support
              </TextBody>
            </View>
          </View>

          <View
            style={[styles.section, { backgroundColor: theme.colors.card }]}
          >
            <TextBody style={styles.tip}>
              💡 Start by modifying the files in the{' '}
              <TextBody style={{ color: theme.colors.tint }}>app/</TextBody>{' '}
              directory to build your app!
            </TextBody>
          </View>
        </View>
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
    padding: Spacing.layout.screen,
    gap: Spacing.spacing.large,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: Spacing.spacing.large,
  },
  section: {
    padding: Spacing.layout.content,
    borderRadius: Spacing.radius.card,
    gap: Spacing.spacing.medium,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.spacing.small,
  },
  description: {
    textAlign: 'center',
    marginBottom: Spacing.spacing.small,
  },
  features: {
    gap: Spacing.spacing.small,
  },
  tip: {
    textAlign: 'center',
    lineHeight: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.spacing.large,
  },
  card: {
    padding: Spacing.layout.content,
    borderRadius: Spacing.radius.card,
    gap: Spacing.spacing.medium,
  },
  buttonContainer: {
    gap: Spacing.spacing.small,
  },
})
