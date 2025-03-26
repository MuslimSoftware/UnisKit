import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
} from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { useTheme } from '@/shared/context/ThemeContext'
import { Button } from '@/shared/components/buttons/Button'
import { Typography } from '@/shared/components/data-display/Typography'
import Box from '@/shared/components/layout/Box'
interface AuthScreenLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
  buttonText: string
  onButtonPress: () => void
  buttonDisabled?: boolean
}

export function AuthScreenLayout({
  title,
  subtitle,
  children,
  buttonText,
  onButtonPress,
  buttonDisabled = false,
}: AuthScreenLayoutProps) {
  const theme = useTheme()
  const buttonAnimation = new Animated.Value(1)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardWillShow =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const keyboardWillHide =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    const showSubscription = Keyboard.addListener(keyboardWillShow, () => {
      setKeyboardVisible(true)
      Animated.timing(buttonAnimation, {
        toValue: 0.3,
        duration: 250,
        useNativeDriver: true,
      }).start()
    })

    const hideSubscription = Keyboard.addListener(keyboardWillHide, () => {
      setKeyboardVisible(false)
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start()
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const handleBack = () => {
    router.back()
  }

  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
    </Box>
    // <ThemedView style={styles.container}>
    //   <View style={styles.header}>
    //     <TouchableOpacity onPress={handleBack} style={styles.backButton}>
    //       <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
    //     </TouchableOpacity>
    //   </View>

    //   {Platform.OS === 'ios' ? (
    //     <KeyboardAvoidingView
    //       behavior="padding"
    //       keyboardVerticalOffset={0}
    //       style={styles.content}
    //     >
    //       <View style={styles.formContainer}>
    //         <TextTitle style={styles.title}>{title}</TextTitle>
    //         <TextBody variant="secondary" style={styles.subtitle}>
    //           {subtitle}
    //         </TextBody>

    //         {children}
    //       </View>

    //       <Animated.View
    //         style={[
    //           styles.buttonContainer,
    //           {
    //             transform: [
    //               {
    //                 translateY: buttonAnimation.interpolate({
    //                   inputRange: [0.3, 1],
    //                   outputRange: [-20, 0],
    //                 }),
    //               },
    //             ],
    //             opacity: buttonAnimation.interpolate({
    //               inputRange: [0.3, 1],
    //               outputRange: [1, 1],
    //             }),
    //           },
    //         ]}
    //       >
    //         <Button
    //           text={buttonText}
    //           onPress={onButtonPress}
    //           disabled={buttonDisabled}
    //         />
    //       </Animated.View>
    //     </KeyboardAvoidingView>
    //   ) : (
    //     <View style={styles.content}>
    //       <View style={styles.formContainer}>
    //         <TextTitle style={styles.title}>{title}</TextTitle>
    //         <TextBody variant="secondary" style={styles.subtitle}>
    //           {subtitle}
    //         </TextBody>

    //         {children}
    //       </View>

    //       <Animated.View
    //         style={[
    //           styles.buttonContainer,
    //           {
    //             transform: [
    //               {
    //                 translateY: buttonAnimation.interpolate({
    //                   inputRange: [0.3, 1],
    //                   outputRange: [keyboardVisible ? -250 : 0, 0],
    //                 }),
    //               },
    //             ],
    //           },
    //         ]}
    //       >
    //         <Button
    //           text={buttonText}
    //           onPress={onButtonPress}
    //           disabled={buttonDisabled}
    //         />
    //       </Animated.View>
    //     </View>
    //   )}
    // </ThemedView>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // header: {
  //   paddingTop: 60,
  //   paddingHorizontal: Spacing.layout.screen,
  //   paddingBottom: Spacing.layout.screen,
  // },
  // backButton: {
  //   padding: Spacing.layout.section,
  //   marginLeft: -Spacing.layout.section,
  // },
  // content: {
  //   flex: 1,
  //   paddingHorizontal: Spacing.layout.screen,
  //   marginTop: Spacing.spacing.xlarge,
  // },
  // formContainer: {},
  // title: {
  //   marginBottom: Spacing.spacing.small,
  // },
  // subtitle: {
  //   marginBottom: Spacing.spacing.xlarge,
  // },
  // buttonContainer: {
  //   ...(Platform.OS === 'ios'
  //     ? {
  //         flex: 1,
  //         justifyContent: 'flex-end',
  //         minHeight: 120,
  //         paddingBottom: 50,
  //       }
  //     : {
  //         position: 'absolute',
  //         bottom: Spacing.layout.screen,
  //         left: Spacing.layout.screen,
  //         right: Spacing.layout.screen,
  //       }),
  // },
})
