import { StyleSheet, TextStyle } from 'react-native'
import { ThemedText, ThemedTextProps } from '../ThemedText'
import { Typography } from '@/constants/Typography'

export function TextTitle(props: ThemedTextProps) {
  return (
    <ThemedText
      {...props}
      fontSize={Typography.sizes.title}
      style={[{ fontWeight: Typography.weights.bold }, props.style]}
    />
  )
}

export function TextSubtitle(props: ThemedTextProps) {
  return (
    <ThemedText
      fontSize={Typography.sizes.subtitle}
      style={[styles.subtitle, props.style]}
      {...props}
    />
  )
}

export function TextBody(props: ThemedTextProps) {
  return <ThemedText {...props} fontSize={Typography.sizes.body} />
}

export function TextSmall(props: ThemedTextProps) {
  return <ThemedText {...props} fontSize={Typography.sizes.bodySmall} />
}

export function TextLink(props: ThemedTextProps) {
  return <ThemedText {...props} fontSize={Typography.sizes.body} />
}

export function TextSemiBold(props: ThemedTextProps) {
  return (
    <ThemedText
      fontSize={Typography.sizes.body}
      style={[{ fontWeight: '600' }, props.style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontWeight: 'bold',
  },
  body: {
    lineHeight: 24,
  },
  small: {
    lineHeight: 20,
  },
  link: {
    lineHeight: 30,
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
})
