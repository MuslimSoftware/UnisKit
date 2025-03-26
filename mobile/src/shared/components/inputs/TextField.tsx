import React from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface TextFieldProps {
  label?: string
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  variant?: 'outlined' | 'filled' | 'standard'
  error?: boolean
  helperText?: string
  disabled?: boolean
  multiline?: boolean
  numberOfLines?: number
  fullWidth?: boolean
  style?: ViewStyle
  inputStyle?: TextStyle
  secureTextEntry?: boolean
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  variant = 'outlined',
  error = false,
  helperText,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  fullWidth = false,
  style,
  inputStyle,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  const { theme } = useTheme()
  const [isFocused, setIsFocused] = React.useState(false)

  const getBorderColor = () => {
    if (error) return theme.palette.error.main
    if (isFocused) return theme.palette.primary.main
    return theme.palette.divider
  }

  const getBackgroundColor = () => {
    if (disabled) return theme.palette.text.disabled
    if (variant === 'filled') return theme.palette.background.paper
    return 'transparent'
  }

  const styles = StyleSheet.create({
    container: {
      width: fullWidth ? '100%' : undefined,
      marginBottom: helperText ? 20 : 8,
      opacity: disabled ? 0.5 : 1,
      ...style,
    },
    label: {
      ...theme.typography.body2,
      color: error ? theme.palette.error.main : theme.palette.text.secondary,
      marginBottom: 4,
    },
    inputContainer: {
      borderWidth: variant === 'standard' ? 0 : 1,
      borderBottomWidth: 1,
      borderColor: getBorderColor(),
      borderRadius: variant === 'standard' ? 0 : theme.shape.borderRadius,
      backgroundColor: getBackgroundColor(),
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    input: {
      ...theme.typography.body1,
      color: theme.palette.text.primary,
      padding: 0,
      ...inputStyle,
    },
    helperText: {
      ...theme.typography.caption,
      color: error ? theme.palette.error.main : theme.palette.text.secondary,
      marginTop: 4,
    },
  })

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor={theme.palette.text.disabled}
        />
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  )
}

export default TextField
