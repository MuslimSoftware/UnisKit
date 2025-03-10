import { useState, useCallback } from 'react'
import { ApiResponse, ApiError } from '../client/apiClient'

interface ApiState<T> {
  data: T | null
  error: ApiError | null
  loading: boolean
}

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: ApiError) => void
  initialData?: T | null
  immediate?: boolean
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const [state, setState] = useState<ApiState<T>>({
    data: options.initialData || null,
    error: null,
    loading: false,
  })

  const execute = useCallback(
    async (...args: any[]) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await apiFunction(...args)
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
    [apiFunction, options]
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