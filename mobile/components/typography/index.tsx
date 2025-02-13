import { StyleSheet } from 'react-native'
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
  return <ThemedText {...props} fontSize={Typography.sizes.medium} />
}

export function TextSmall(props: ThemedTextProps) {
  return <ThemedText {...props} fontSize={Typography.sizes.small} />
}

export function TextMedium(props: ThemedTextProps) {
  return <ThemedText {...props} fontSize={Typography.sizes.medium} />
}

export function TextLarge(props: ThemedTextProps) {
  return <ThemedText {...props} fontSize={Typography.sizes.large} />
}

export function TextXLarge(props: ThemedTextProps) {
  return <ThemedText {...props} fontSize={Typography.sizes.xlarge} />
}

export function TextLink(props: ThemedTextProps) {
  return <ThemedText {...props} fontSize={Typography.sizes.medium} />
}

export function TextSemiBold(props: ThemedTextProps) {
  return (
    <ThemedText
      fontSize={Typography.sizes.medium}
      style={[{ fontWeight: '600' }, props.style]}
      {...props}
    />
  )
}

export function TextBold(props: ThemedTextProps) {
  return (
    <ThemedText
      fontSize={Typography.sizes.medium}
      style={[{ fontWeight: 'bold' }, props.style]}
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
