import { config } from '@/config'
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

      const rawResponse = await fetch(`${config.apiUrl}/auth/refresh`, {
        method: HttpMethod.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      const response = await rawResponse.json()
      if (!response.success) return false

      await SecureStore.setItemAsync('access_token', response.data.access_token)
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
    this.baseUrl = config.apiUrl
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

  private async makeRequest<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const requestOptions: RequestInit = {
      ...options,
      method,
      ...(data && { body: JSON.stringify(data) }),
    }
    return this.request<T>(endpoint, requestOptions)
  }

  public async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(HttpMethod.GET, endpoint, undefined, options)
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(HttpMethod.POST, endpoint, data, options)
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(HttpMethod.PUT, endpoint, data, options)
  }

  public async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(HttpMethod.DELETE, endpoint, undefined, options)
  }
}

export const apiClient = new ApiClient() 