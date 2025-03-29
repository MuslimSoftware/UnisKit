import React from 'react'
import {
  View,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { BaseInput } from '@/shared/components/inputs/BaseInput'
import { TextBody } from '@/shared/components/text'
import { paddings, gaps } from '@/shared/theme/spacing'
import { useTheme } from '@/shared/context/ThemeContext'

interface AuthInputProps extends Omit<TextInputProps, 'style'> {
  label?: string
  inputStyle?: StyleProp<TextStyle>
  containerStyle?: ViewStyle
  error?: boolean
  errorMessage?: string
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  inputStyle,
  containerStyle,
  error,
  errorMessage,
  ...props
}) => {
  const { theme } = useTheme()

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      <BaseInput
        inputStyle={inputStyle}
        error={error}
        placeholder={label}
        {...props}
      />
      {error && errorMessage && (
        <TextBody
          style={{
            ...styles.errorText,
            color: theme.colors.indicators.error,
          }}
        >
          {errorMessage}
        </TextBody>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    marginBottom: paddings.medium,
  },
  errorText: {
    marginTop: gaps.xsmall,
    fontSize: 12,
  },
})
