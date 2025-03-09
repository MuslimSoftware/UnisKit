import { Environment } from '@/constants/Environment'
import * as SecureStore from 'expo-secure-store'

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

export interface ApiError {
  message: string
  error_code: string
  status_code: number
}

export class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseUrl = Environment.apiUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async getAuthToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('access_token')
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await SecureStore.getItemAsync('refresh_token')
      if (!refreshToken) return false

      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      const data = await response.json()
      if (!data.success) return false

      await SecureStore.setItemAsync('access_token', data.data.access_token)
      return true
    } catch {
      return false
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = { ...this.defaultHeaders }

    // Add auth token if available
    const token = await this.getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      let response = await fetch(url, {
        ...options,
        headers: { ...headers, ...options.headers },
      })

      // Handle 401 with token refresh
      if (response.status === 401 && token) {
        const refreshed = await this.refreshToken()
        if (refreshed) {
          const newToken = await this.getAuthToken()
          headers['Authorization'] = `Bearer ${newToken}`
          response = await fetch(url, {
            ...options,
            headers: { ...headers, ...options.headers },
          })
        }
      }

      const text = await response.text()
      const data = text ? JSON.parse(text) : null

      if (!response.ok) {
        throw {
          message: data?.message || `Request failed with status ${response.status}`,
          error_code: data?.error_code || 'UNKNOWN_ERROR',
          status_code: response.status,
        }
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          error_code: 'NETWORK_ERROR',
          status_code: 500,
        }
      }
      throw error
    }
  }

  public async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  public async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient() 