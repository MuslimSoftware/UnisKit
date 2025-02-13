import { View, StyleSheet, ScrollView, Platform, Pressable } from 'react-native'
import { TextTitle, TextBody, TextSmall } from '@/components/typography'
import { Spacing } from '@/constants/Spacing'
import { useTheme } from '@/hooks/theme'
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      {
        icon: 'person.circle.fill' as IconSymbolName,
        label: 'Personal Information',
      },
      { icon: 'envelope.fill' as IconSymbolName, label: 'Email Preferences' },
      { icon: 'gear' as IconSymbolName, label: 'Account Settings' },
    ],
  },
  {
    title: 'Appearance',
    items: [
      { icon: 'house.fill' as IconSymbolName, label: 'Theme' },
      { icon: 'pencil' as IconSymbolName, label: 'Customize' },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { icon: 'link' as IconSymbolName, label: 'Privacy Settings' },
      { icon: 'lock.fill' as IconSymbolName, label: 'Security' },
      {
        icon: 'lock.fill' as IconSymbolName,
        label: 'Two-Factor Authentication',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'house.fill' as IconSymbolName, label: 'Help Center' },
      { icon: 'envelope.fill' as IconSymbolName, label: 'Contact Support' },
      {
        icon: 'square.and.pencil' as IconSymbolName,
        label: 'Terms of Service',
      },
      { icon: 'location.fill' as IconSymbolName, label: 'Privacy Policy' },
    ],
  },
]

export default function SettingsScreen() {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const handleLogout = () => {
    router.replace('/(auth)/landing')
  }

  const renderSettingItem = ({
    icon,
    label,
  }: {
    icon: IconSymbolName
    label: string
  }) => (
    <Pressable
      key={label}
      style={({ pressed }) => [
        styles.settingItem,
        {
          backgroundColor: pressed
            ? Platform.OS === 'ios'
              ? theme.isDark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)'
              : theme.isDark
              ? theme.colors.border + '40'
              : theme.colors.border + '40'
            : 'transparent',
        },
      ]}
    >
      <View style={styles.settingItemContent}>
        <IconSymbol
          name={icon}
          size={Spacing.icon.lg}
          color={theme.colors.tint}
          style={styles.icon}
        />
        <TextBody style={styles.settingLabel}>{label}</TextBody>
      </View>
      <IconSymbol
        name="chevron.right"
        size={Spacing.icon.sm}
        color={theme.colors.secondaryText}
      />
    </Pressable>
  )

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom + Spacing.padding.content,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={[styles.header, { paddingTop: Spacing.padding.screen }]}>
            <Pressable
              onPress={() => router.back()}
              style={[
                styles.backButton,
                { backgroundColor: theme.colors.card },
              ]}
              hitSlop={{
                top: Spacing.touchTarget.hitSlop,
                bottom: Spacing.touchTarget.hitSlop,
                left: Spacing.touchTarget.hitSlop,
                right: Spacing.touchTarget.hitSlop,
              }}
            >
              <IconSymbol
                name="chevron.right"
                size={Spacing.icon.md}
                color={theme.colors.text}
              />
            </Pressable>
            <TextTitle>Settings</TextTitle>
          </View>

          {SETTINGS_SECTIONS.map((section) => (
            <View key={section.title} style={styles.section}>
              <TextSmall
                style={[
                  styles.sectionTitle,
                  { color: theme.colors.secondaryText },
                ]}
              >
                {section.title}
              </TextSmall>
              <View
                style={[
                  styles.sectionContent,
                  { backgroundColor: theme.colors.card },
                ]}
              >
                {section.items.map((item, index) => (
                  <View key={item.label}>
                    {renderSettingItem(item)}
                    {index < section.items.length - 1 && (
                      <View
                        style={[
                          styles.separator,
                          { backgroundColor: theme.colors.border },
                        ]}
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}

          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              {
                backgroundColor: theme.colors.card,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={handleLogout}
          >
            <TextBody style={{ color: Colors.error }}>Log Out</TextBody>
          </Pressable>
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
    alignItems: 'center',
    marginBottom: Spacing.margin.lg,
  },
  backButton: {
    marginRight: Spacing.margin.md,
    width: Spacing.touchTarget.minSize,
    height: Spacing.touchTarget.minSize,
    borderRadius: Spacing.touchTarget.minSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scaleX: -1 }],
  },
  section: {
    gap: Spacing.gap.sm,
  },
  sectionContent: {
    borderRadius: Spacing.borderRadius.card,
    overflow: 'hidden',
  },
  sectionTitle: {
    marginLeft: Spacing.margin.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.padding.screen,
    paddingVertical: Spacing.padding.button,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.gap.sm,
    flex: 1,
  },
  icon: {
    width: Spacing.icon.lg,
  },
  settingLabel: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: Spacing.padding.screen,
  },
  logoutButton: {
    padding: Spacing.padding.screen,
    borderRadius: Spacing.borderRadius.card,
    alignItems: 'center',
    marginTop: Spacing.margin.md,
  },
})
