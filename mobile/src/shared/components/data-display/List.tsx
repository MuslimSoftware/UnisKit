import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface ListProps {
  style?: ViewStyle
  children: React.ReactNode
}

export interface ListItemProps {
  primary: string
  secondary?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  divider?: boolean
  button?: boolean
  onPress?: () => void
  style?: ViewStyle
  primaryStyle?: TextStyle
  secondaryStyle?: TextStyle
}

export const List: React.FC<ListProps> = ({ style, children }) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      ...style,
    },
  })

  return <ScrollView style={styles.list}>{children}</ScrollView>
}

export const ListItem: React.FC<ListItemProps> = ({
  primary,
  secondary,
  leftIcon,
  rightIcon,
  divider = false,
  button = false,
  onPress,
  style,
  primaryStyle,
  secondaryStyle,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing(1.5),
      paddingHorizontal: theme.spacing(2),
      borderBottomWidth: divider ? 1 : 0,
      borderBottomColor: theme.palette.divider,
      ...style,
    },
    content: {
      flex: 1,
      marginLeft: leftIcon ? theme.spacing(2) : 0,
      marginRight: rightIcon ? theme.spacing(2) : 0,
    },
    primary: {
      ...theme.typography.body1,
      color: theme.palette.text.primary,
      ...primaryStyle,
    },
    secondary: {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
      ...secondaryStyle,
    },
  })

  const Content = () => (
    <>
      {leftIcon}
      <View style={styles.content}>
        <Text style={styles.primary}>{primary}</Text>
        {secondary && <Text style={styles.secondary}>{secondary}</Text>}
      </View>
      {rightIcon}
    </>
  )

  if (button || onPress) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Content />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.item}>
      <Content />
    </View>
  )
}

export default { List, ListItem }
