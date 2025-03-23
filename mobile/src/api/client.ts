import { Environment } from '@/constants/Environment'
import { HttpMethod, ApiResponse } from '@/api/types/api.types'
import * as SecureStore from 'expo-secure-store'

class TokenManager {
  static async getAuthToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('access_token')
  }

  static async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await SecureStore.getItemAsync('refresh_token')
      if (!refreshToken) return false

      const response = await fetch(`${Environment.apiUrl}/auth/refresh`, {
        method: HttpMethod.POST,
        headers: { 'Content-Type': 'application/json' },
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
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseUrl = Environment.apiUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = { ...this.defaultHeaders }

    // Add auth token if available
    const token = await TokenManager.getAuthToken()
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
        const refreshed = await TokenManager.refreshToken()
        if (refreshed) {
          const newToken = await TokenManager.getAuthToken()
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
    return this.request<T>(endpoint, { ...options, method: HttpMethod.GET })
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: HttpMethod.POST,
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
      method: HttpMethod.PUT,
      body: JSON.stringify(data),
    })
  }

  public async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: HttpMethod.DELETE })
  }
}

export const apiClient = new ApiClient() 