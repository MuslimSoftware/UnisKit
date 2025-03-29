import { StyleSheet, ScrollView, Platform, Pressable, View } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import {
  BgView,
  FgView,
  PageView,
  Column,
  BaseColumn,
} from '@/shared/components/layout'
import { TextHeader, TextBody, TextCaption } from '@/shared/components/text'
import { Ionicons } from '@expo/vector-icons'
import { scale, spacing } from '@/shared/theme/spacing'
import { ListButton } from '@/shared/components/buttons'
// --- Types ---
type IoniconName = keyof typeof Ionicons.glyphMap
type SettingItem = {
  icon: IoniconName
  label: string
}

type SettingsSection = {
  title: string
  items: SettingItem[]
}

// --- Settings Data ---
// Apply the strong types to the data
const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: 'Account',
    items: [
      {
        icon: 'person-circle-outline',
        label: 'Personal Information',
      },
      { icon: 'mail-outline', label: 'Email Preferences' },
      { icon: 'settings-outline', label: 'Account Settings' },
    ],
  },
  {
    title: 'Appearance',
    items: [
      { icon: 'color-palette-outline', label: 'Theme' },
      { icon: 'create-outline', label: 'Customize' },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { icon: 'shield-checkmark-outline', label: 'Privacy Settings' },
      { icon: 'lock-closed-outline', label: 'Security' },
      {
        icon: 'keypad-outline',
        label: 'Two-Factor Authentication',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Help Center' },
      { icon: 'chatbubble-ellipses-outline', label: 'Contact Support' },
      {
        icon: 'document-text-outline',
        label: 'Terms of Service',
      },
      { icon: 'shield-outline', label: 'Privacy Policy' },
    ],
  },
]

export default function SettingsScreen() {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('refresh_token')
    await SecureStore.deleteItemAsync('access_token')
    router.replace('/(auth)/landing')
  }

  const switchAccounts = () => {
    // TODO: Implement switch accounts
    console.log('switch accounts')
  }

  return (
    <BgView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + (spacing.section.padding ?? 24),
            paddingBottom: insets.bottom + (spacing.section.padding ?? 24),
          },
        ]}
      >
        <PageView style={styles.content}>
          <View style={styles.header}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="arrow-back"
                size={theme.typography.icon.md}
                color={theme.colors.text.primary}
              />
            </Pressable>
            <TextHeader>Settings</TextHeader>
            <View style={styles.headerSpacer} />
          </View>

          <BaseColumn gap={scale.lg}>
            {SETTINGS_SECTIONS.map((section) => (
              <View key={section.title} style={styles.section}>
                <TextCaption
                  style={styles.sectionTitle}
                  color={theme.colors.text.secondary}
                >
                  {section.title}
                </TextCaption>
                <FgView style={styles.sectionContent}>
                  {section.items.map((item, index) => (
                    <View key={item.label}>
                      <ListButton
                        label={item.label}
                        icon={item.icon}
                        onPress={() => {
                          console.log('pressed')
                        }}
                        iconColor={theme.colors.text.primary}
                      />
                      {index < section.items.length - 1 && (
                        <View
                          style={[
                            styles.separator,
                            { backgroundColor: theme.colors.layout.border },
                          ]}
                        />
                      )}
                    </View>
                  ))}
                </FgView>
              </View>
            ))}
          </BaseColumn>

          <FgView style={styles.logoutButtonContainer}>
            <ListButton
              label="Switch Account"
              onPress={switchAccounts}
              labelColor={theme.colors.text.primary}
              iconColor={theme.colors.text.primary}
              icon="swap-horizontal-outline"
              showChevron={false}
              style={styles.logoutButton}
            />
            <ListButton
              label="Log Out"
              onPress={handleLogout}
              labelColor={theme.colors.indicators.error}
              iconColor={theme.colors.indicators.error}
              icon="log-out-outline"
              showChevron={false}
              style={styles.logoutButton}
            />
          </FgView>
        </PageView>
      </ScrollView>
    </BgView>
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
    gap: scale.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: scale.sm,
  },
  headerSpacer: {
    width: 48,
  },
  section: {
    gap: scale.sm,
  },
  sectionContent: {
    borderRadius: spacing.card.borderRadius ?? 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    marginLeft: scale.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 56,
  },
  logoutButtonContainer: {
    borderRadius: spacing.card.borderRadius ?? 12,
    marginTop: scale.md,
    overflow: 'hidden',
  },
  logoutButton: {},
})
