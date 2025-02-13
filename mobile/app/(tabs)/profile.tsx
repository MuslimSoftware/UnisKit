import { View, StyleSheet, ScrollView, Platform, Pressable } from 'react-native'
import {
  TextTitle,
  TextBody,
  TextSmall,
  TextSemiBold,
} from '@/components/typography'
import { Spacing } from '@/constants/Spacing'
import { useTheme } from '@/hooks/theme'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function ProfileScreen() {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const handleSettingsPress = () => {
    router.push('/(stack)/settings')
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + Spacing.padding.screen,
            paddingBottom:
              Platform.OS === 'ios'
                ? insets.bottom + Spacing.tabBar.height
                : Spacing.padding.content + Spacing.tabBar.androidPadding,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TextTitle>Profile</TextTitle>
            <Pressable
              onPress={handleSettingsPress}
              style={({ pressed }) => [
                styles.settingsButton,
                {
                  backgroundColor: theme.colors.card,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              hitSlop={{
                top: Spacing.touchTarget.hitSlop,
                bottom: Spacing.touchTarget.hitSlop,
                left: Spacing.touchTarget.hitSlop,
                right: Spacing.touchTarget.hitSlop,
              }}
            >
              <IconSymbol
                name="gearshape.fill"
                size={Spacing.icon.md}
                color={theme.colors.text}
              />
            </Pressable>
          </View>

          <View
            style={[styles.profileCard, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.profileInfo}>
              <View
                style={[
                  styles.avatarPlaceholder,
                  { backgroundColor: theme.colors.border },
                ]}
              >
                <IconSymbol
                  name="person.circle.fill"
                  size={40}
                  color={theme.colors.secondaryText}
                />
              </View>
              <View style={styles.nameContainer}>
                <TextTitle style={styles.name}>Younes Benketira</TextTitle>
                <TextSmall
                  style={[
                    styles.username,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  @younesbenketira
                </TextSmall>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <IconSymbol
                name="location.fill"
                size={Spacing.icon.sm}
                color={theme.colors.secondaryText}
              />
              <TextSmall
                style={[styles.location, { color: theme.colors.secondaryText }]}
              >
                Montreal, QC
              </TextSmall>
            </View>
          </View>

          <View
            style={[styles.section, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.sectionHeader}>
              <TextSemiBold style={styles.sectionTitle}>About</TextSemiBold>
              <Pressable
                style={({ pressed }) => [
                  styles.editButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <IconSymbol
                  name="pencil"
                  size={Spacing.icon.sm}
                  color={theme.colors.tint}
                />
              </Pressable>
            </View>
            <TextBody
              style={[styles.bio, { color: theme.colors.secondaryText }]}
            >
              Software developer passionate about creating amazing user
              experiences. Love building beautiful and functional apps.
            </TextBody>
          </View>

          <View
            style={[styles.section, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.sectionHeader}>
              <TextSemiBold style={styles.sectionTitle}>Contact</TextSemiBold>
              <Pressable
                style={({ pressed }) => [
                  styles.editButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <IconSymbol
                  name="pencil"
                  size={Spacing.icon.sm}
                  color={theme.colors.tint}
                />
              </Pressable>
            </View>
            <View style={styles.contactItem}>
              <IconSymbol
                name="envelope.fill"
                size={Spacing.icon.sm}
                color={theme.colors.secondaryText}
              />
              <TextSmall
                style={[
                  styles.contactText,
                  { color: theme.colors.secondaryText },
                ]}
              >
                john.doe@example.com
              </TextSmall>
            </View>
            <View style={styles.contactItem}>
              <IconSymbol
                name="link"
                size={Spacing.icon.sm}
                color={theme.colors.secondaryText}
              />
              <TextSmall
                style={[
                  styles.contactText,
                  { color: theme.colors.secondaryText },
                ]}
              >
                github.com/johndoe
              </TextSmall>
            </View>
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
    padding: Spacing.padding.screen,
    gap: Spacing.gap.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsButton: {
    width: Spacing.touchTarget.minSize,
    height: Spacing.touchTarget.minSize,
    borderRadius: Spacing.touchTarget.minSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    padding: Spacing.padding.screen,
    borderRadius: Spacing.borderRadius.card,
    gap: Spacing.gap.md,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.gap.md,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    marginBottom: Spacing.margin.xs,
  },
  username: {
    opacity: 0.7,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.gap.inline,
  },
  section: {
    padding: Spacing.padding.screen,
    borderRadius: Spacing.borderRadius.card,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.margin.md,
  },
  sectionTitle: {
    fontSize: 18,
  },
  editButton: {
    padding: 8,
  },
  bio: {
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.margin.sm,
    gap: Spacing.gap.inline,
  },
  contactText: {
    flex: 1,
  },
  location: {
    flex: 1,
  },
})
