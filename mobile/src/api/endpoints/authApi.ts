import { apiClient } from '../client/apiClient'
import { ApiResponse } from '../client/apiClient'

interface RequestOTPResponse {
  expires_in: number
}

interface ValidateOTPResponse {
  token: string
}

interface AuthResponse {
  access_token: string
  refresh_token: string
}

export const requestOTP = async (email: string): Promise<ApiResponse<RequestOTPResponse>> => {
  return apiClient.post('/auth/request-otp', { email })
}

export const validateOTP = async (email: string, otp: string): Promise<ApiResponse<ValidateOTPResponse>> => {
  return apiClient.post('/auth/validate-otp', { email, otp })
}

export const authenticate = async (token: string): Promise<ApiResponse<AuthResponse>> => {
  return apiClient.post('/auth/auth', { token })
}

export const refreshToken = async (refreshToken: string): Promise<ApiResponse<{ access_token: string }>> => {
  return apiClient.post('/auth/refresh', { refresh_token: refreshToken })
} 