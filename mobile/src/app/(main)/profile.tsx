import {
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  Image,
  View,
} from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import {
  TextBody,
  TextHeader,
  TextCaption,
  TextHeaderTwo,
} from '@/shared/components/text'
import { Ionicons } from '@expo/vector-icons'
import {
  Column,
  BaseColumn,
  BgView,
  FgView,
  SmColumn,
} from '@/shared/components/layout'
import { scale, spacing } from '@/shared/theme/spacing'

export default function ProfileScreen() {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const handleSettingsPress = () => {
    router.push('/settings')
  }

  const TAB_BAR_HEIGHT = 60

  return (
    <BgView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.section.padding,
            paddingBottom:
              Platform.OS === 'ios'
                ? insets.bottom + TAB_BAR_HEIGHT
                : insets.bottom + spacing.section.padding,
          },
        ]}
      >
        <BaseColumn style={styles.content} gap={scale.lg}>
          <View style={styles.header}>
            <TextHeader>Profile</TextHeader>
            <Pressable
              onPress={handleSettingsPress}
              style={({ pressed }) => [
                styles.settingsButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="settings-outline"
                size={theme.typography.icon.sm}
                color={theme.colors.text.primary}
              />
            </Pressable>
          </View>

          <FgView style={styles.profileCard}>
            <BaseColumn gap={scale.md}>
              <View style={styles.profileInfo}>
                <View
                  style={[
                    styles.avatarPlaceholder,
                    { backgroundColor: theme.colors.layout.border },
                  ]}
                >
                  <Image
                    source={require('@/assets/images/icon.png')}
                    style={styles.avatar}
                  />
                </View>
                <SmColumn style={styles.nameContainer}>
                  <TextHeaderTwo>Younes Benketira</TextHeaderTwo>
                  <TextCaption
                    style={styles.username}
                    color={theme.colors.text.secondary}
                  >
                    @younesbenketira
                  </TextCaption>
                </SmColumn>
              </View>
              <View style={styles.locationContainer}>
                <Ionicons
                  name="location-outline"
                  size={theme.typography.icon.sm}
                  color={theme.colors.text.secondary}
                />
                <TextCaption
                  style={styles.locationText}
                  color={theme.colors.text.secondary}
                >
                  Montreal, QC
                </TextCaption>
              </View>
            </BaseColumn>
          </FgView>

          <FgView style={styles.section}>
            <Column>
              <View style={styles.sectionHeader}>
                <TextBody>About</TextBody>
              </View>
              <TextBody color={theme.colors.text.secondary}>
                Software developer passionate about creating amazing user
                experiences. Love building beautiful and functional apps.
              </TextBody>
            </Column>
          </FgView>

          <FgView style={styles.section}>
            <Column>
              <View style={styles.sectionHeader}>
                <TextBody>Contact</TextBody>
              </View>
              <BaseColumn gap={scale.sm}>
                <View style={styles.contactItem}>
                  <Ionicons
                    name="mail-outline"
                    size={theme.typography.icon.xs}
                    color={theme.colors.text.secondary}
                  />
                  <TextCaption
                    style={styles.contactText}
                    color={theme.colors.text.secondary}
                  >
                    me@younesbenketira.com
                  </TextCaption>
                </View>
                <View style={styles.contactItem}>
                  <Ionicons
                    name="link-outline"
                    size={theme.typography.icon.xs}
                    color={theme.colors.text.secondary}
                  />
                  <TextCaption
                    style={styles.contactText}
                    color={theme.colors.text.secondary}
                  >
                    github.com/younesbenketira
                  </TextCaption>
                </View>
              </BaseColumn>
            </Column>
          </FgView>
        </BaseColumn>
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
    paddingHorizontal: spacing.section.padding ?? 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsButton: {
    padding: scale.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    padding: scale.sm,
  },
  profileCard: {
    padding: scale.lg,
    borderRadius: spacing.card.borderRadius ?? 12,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale.md,
  },
  avatarPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameContainer: {
    flex: 1,
  },
  username: {
    opacity: 0.7,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale.xs,
  },
  locationText: {
    flex: 1,
  },
  section: {
    padding: scale.lg,
    borderRadius: spacing.card.borderRadius ?? 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale.sm,
  },
  contactText: {
    flex: 1,
  },
})
