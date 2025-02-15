import { useState } from 'react';
import { useFetch } from '../api/useFetch';
import { Environment } from '../../constants/Environment';
import { useAuth } from '../../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

interface VerifyEmailResponse {
  exists: boolean;
  message: string;
}

interface VerifyOTPResponse {
  signup_token: string;
  expires_at: string;
}

interface CompleteSignupResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface RequestConfig {
  url: string;
  options?: RequestInit;
}

export const useSignupFlow = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [signupToken, setSignupToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
  
  const { signIn } = useAuth();
  const verifyEmail = useFetch<VerifyEmailResponse>(() => ({
    url: `${Environment.apiUrl}/auth/verify-email`,
    options: {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  }));

  const requestOTP = useFetch<{ message: string }>(() => ({
    url: `${Environment.apiUrl}/auth/request-otp`,
    options: {
      method: 'POST',
      body: JSON.stringify({ email, type: 'signup' }),
    },
  }));

  const verifyOTP = useFetch<VerifyOTPResponse>(() => ({
    url: `${Environment.apiUrl}/auth/verify-signup-otp`,
    options: {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    },
  }));

  const completeSignup = useFetch<CompleteSignupResponse>(() => ({
    url: `${Environment.apiUrl}/auth/complete-signup`,
    options: {
      method: 'POST',
      body: JSON.stringify({ signup_token: signupToken, password }),
    },
  }));

  const handleEmailStep = async () => {
    const response = await verifyEmail.fetch();
    if (!response) throw new Error('Failed to verify email');

    if (response.exists) {
      throw new Error('Email already exists');
    }

    const otpResponse = await requestOTP.fetch();
    if (!otpResponse) throw new Error('Failed to request OTP');

    setStep('otp');
  };

  const handleOTPStep = async () => {
    const response = await verifyOTP.fetch();
    if (!response) throw new Error('Failed to verify OTP');

    setSignupToken(response.signup_token);
    setStep('password');
  };

  const handlePasswordStep = async () => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const response = await completeSignup.fetch();
    if (!response) throw new Error('Failed to complete signup');

    // Store tokens in secure storage before signing in
    await SecureStore.setItemAsync('access_token', response.access_token);
    await SecureStore.setItemAsync('refresh_token', response.refresh_token);
    
    signIn();
  };

  return {
    email,
    setEmail,
    otp,
    setOtp,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    step,
    handleEmailStep,
    handleOTPStep,
    handlePasswordStep,
  };
}; 