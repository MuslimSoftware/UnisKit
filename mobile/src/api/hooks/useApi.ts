import { useState, useCallback } from 'react'
import { apiClient, ApiResponse, ApiError } from '../client/apiClient'

interface ApiState<T> {
  data: T | null
  error: ApiError | null
  loading: boolean
}

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: ApiError) => void
  initialData?: T | null
}

type ApiMethod = 'get' | 'post' | 'put' | 'delete'

export function useApi<T>(
  method: ApiMethod,
  endpoint: string,
  options: UseApiOptions<T> = {}
) {
  const [state, setState] = useState<ApiState<T>>({
    data: options.initialData || null,
    error: null,
    loading: false,
  })

  const execute = useCallback(
    async (data?: any) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        let response: ApiResponse<T>

        switch (method) {
          case 'get':
            response = await apiClient.get<T>(endpoint)
            break
          case 'post':
            response = await apiClient.post<T>(endpoint, data)
            break
          case 'put':
            response = await apiClient.put<T>(endpoint, data)
            break
          case 'delete':
            response = await apiClient.delete<T>(endpoint)
            break
          default:
            throw new Error(`Unsupported method: ${method}`)
        }

        setState({ data: response.data, error: null, loading: false })
        options.onSuccess?.(response.data)
        return response.data
      } catch (error) {
        const apiError = error as ApiError
        setState({
          data: null,
          error: apiError,
          loading: false,
        })
        options.onError?.(apiError)
        throw apiError
      }
    },
    [method, endpoint, options]
  )

  const reset = useCallback(() => {
    setState({
      data: options.initialData || null,
      error: null,
      loading: false,
    })
  }, [options.initialData])

  return {
    ...state,
    execute,
    reset,
  }
} 