import { View, StyleSheet, ScrollView, Platform, Pressable } from 'react-native'
import { TextTitle, TextBody, TextSmall } from '@/shared/components/ui'
import { Spacing } from '@/shared/constants/Spacing'
import { useTheme } from '@/shared/hooks'
import { IconSymbol, IconSymbolName } from '@/shared/components/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/shared/constants/Colors'
import * as SecureStore from 'expo-secure-store'
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

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('refresh_token')
    await SecureStore.deleteItemAsync('access_token')
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
          backgroundColor: pressed ? theme.colors.border + '40' : 'transparent',
        },
      ]}
    >
      <View style={styles.settingItemContent}>
        <IconSymbol
          name={icon}
          size={Spacing.size.icon.large}
          color={theme.colors.tint}
          style={styles.icon}
        />
        <TextBody style={styles.settingLabel}>{label}</TextBody>
      </View>
      <IconSymbol
        name="chevron.right"
        size={Spacing.size.icon.small}
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
            paddingBottom: insets.bottom + Spacing.layout.content,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={[styles.header, { paddingTop: Spacing.layout.screen }]}>
            <Pressable
              onPress={() => router.back()}
              style={[
                styles.backButton,
                { backgroundColor: theme.colors.card },
              ]}
              hitSlop={{
                top: Spacing.interactive.pressableArea,
                bottom: Spacing.interactive.pressableArea,
                left: Spacing.interactive.pressableArea,
                right: Spacing.interactive.pressableArea,
              }}
            >
              <IconSymbol
                name="chevron.right"
                size={Spacing.size.icon.medium}
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
    padding: Spacing.layout.screen,
    gap: Spacing.spacing.large,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.spacing.large,
  },
  backButton: {
    marginRight: Spacing.spacing.medium,
    width: Spacing.size.element.small,
    height: Spacing.size.element.small,
    borderRadius: Spacing.size.element.small / 2,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scaleX: -1 }],
  },
  section: {
    gap: Spacing.spacing.small,
  },
  sectionContent: {
    borderRadius: Spacing.radius.card,
    overflow: 'hidden',
  },
  sectionTitle: {
    marginLeft: Spacing.spacing.small,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.layout.screen,
    paddingVertical: Spacing.layout.section,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing.small,
    flex: 1,
  },
  icon: {
    width: Spacing.size.icon.large,
  },
  settingLabel: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: Spacing.layout.screen,
  },
  logoutButton: {
    padding: Spacing.layout.screen,
    borderRadius: Spacing.radius.card,
    alignItems: 'center',
    marginTop: Spacing.spacing.medium,
  },
})
