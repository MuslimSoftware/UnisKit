import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  Image,
} from 'react-native'
import { Typography } from '@/shared/components/data-display/Typography'
import { useTheme } from '@/shared/context/ThemeContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Box from '@/shared/components/layout/Box'
export default function ProfileScreen() {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const handleSettingsPress = () => {
    router.push('/(stack)/settings')
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.palette.background.default },
      ]}
    >
      {/* <ScrollView
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
          <View style={styles.header}>
            <Typography variant="h1">Profile</Typography>
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
                top: Spacing.interactive.pressableArea,
                bottom: Spacing.interactive.pressableArea,
                left: Spacing.interactive.pressableArea,
                right: Spacing.interactive.pressableArea,
              }}
            >
              <IconSymbol
                name="gear"
                size={Spacing.size.icon.medium}
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
                <Image
                  source={require('@/assets/images/profile_picture.png')}
                  style={styles.avatar}
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
                size={Spacing.size.icon.small}
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
                  size={Spacing.size.icon.small}
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
                  size={Spacing.size.icon.small}
                  color={theme.colors.tint}
                />
              </Pressable>
            </View>
            <View style={styles.contactItem}>
              <IconSymbol
                name="envelope.fill"
                size={Spacing.size.icon.small}
                color={theme.colors.secondaryText}
              />
              <TextSmall
                style={[
                  styles.contactText,
                  { color: theme.colors.secondaryText },
                ]}
              >
                me@younesbenketira.com
              </TextSmall>
            </View>
            <View style={styles.contactItem}>
              <IconSymbol
                name="link"
                size={Spacing.size.icon.small}
                color={theme.colors.secondaryText}
              />
              <TextSmall
                style={[
                  styles.contactText,
                  { color: theme.colors.secondaryText },
                ]}
              >
                github.com/younesbenketira
              </TextSmall>
            </View>
          </View>
        </View>
      </ScrollView> */}
      <Box>
        <Typography variant="h1">Profile</Typography>
      </Box>
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // scrollContent: {
  //   flexGrow: 1,
  // },
  // content: {
  //   flex: 1,
  //   padding: Spacing.layout.screen,
  //   gap: Spacing.spacing.large,
  // },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // settingsButton: {
  //   width: Spacing.size.element.small,
  //   height: Spacing.size.element.small,
  //   borderRadius: Spacing.size.element.small / 2,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // avatar: {
  //   width: Spacing.size.element.large,
  //   height: Spacing.size.element.large,
  //   borderRadius: Spacing.radius.circle,
  // },
  // profileCard: {
  //   padding: Spacing.layout.screen,
  //   borderRadius: Spacing.radius.card,
  //   gap: Spacing.spacing.medium,
  // },
  // profileInfo: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: Spacing.spacing.medium,
  // },
  // avatarPlaceholder: {
  //   width: Spacing.size.element.large + 5,
  //   height: Spacing.size.element.large + 5,
  //   borderRadius: Spacing.radius.circle,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // nameContainer: {
  //   flex: 1,
  // },
  // name: {
  //   marginBottom: Spacing.spacing.xsmall,
  // },
  // username: {
  //   opacity: 0.7,
  // },
  // locationContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: Spacing.spacing.xxsmall,
  // },
  // section: {
  //   padding: Spacing.layout.screen,
  //   borderRadius: Spacing.radius.card,
  // },
  // sectionHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: Spacing.spacing.medium,
  // },
  // sectionTitle: {
  //   fontSize: 18,
  // },
  // editButton: {
  //   padding: Spacing.spacing.small,
  // },
  // bio: {
  //   lineHeight: 24,
  // },
  // contactItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: Spacing.spacing.small,
  //   gap: Spacing.spacing.xxsmall,
  // },
  // contactText: {
  //   flex: 1,
  // },
  // location: {
  //   flex: 1,
  // },
})
