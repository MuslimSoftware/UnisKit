import React from 'react'
import { PrimaryButton } from '@/shared/components/buttons'
import { AppleButton } from '@/shared/components/buttons'
import { GoogleButton } from '@/shared/components/buttons'
import { SmColumn } from '@/shared/components/layout'

interface SocialButtonsProps {
  navigateToEmail: () => void
}

export function SocialButtons({ navigateToEmail }: SocialButtonsProps) {
  return (
    <SmColumn>
      <PrimaryButton label="Continue with Email" onPress={navigateToEmail} />
      <GoogleButton onPress={navigateToEmail} />
      <AppleButton onPress={navigateToEmail} />
    </SmColumn>
  )
}
