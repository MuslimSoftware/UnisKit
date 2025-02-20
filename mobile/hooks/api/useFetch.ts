import { useState, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

interface RequestConfig {
  url: string
  options?: RequestInit
}

interface UseFetchResult<T> extends FetchState<T> {
  fetch: (params?: any) => Promise<T | null>
  reset: () => void
}

export function useFetch<T>(
  requestFn: (params?: any) => RequestConfig,
  initialData: T | null = null
): UseFetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: initialData,
    error: null,
    loading: false,
  })

  const reset = useCallback(() => {
    setState({
      data: initialData,
      error: null,
      loading: false,
    })
  }, [initialData])

  const fetch = useCallback(
    async (params?: any): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const { url, options } = requestFn(params)
        const response = await window.fetch(url, options)
        const text = await response.text()
        const data = text ? JSON.parse(text) : null

        if (!response.ok) {          
          const errorMessage = data?.detail || `Request failed with status ${response.status}`
          throw new Error(errorMessage)
        }

        setState({ data, error: null, loading: false })
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        setState({
          data: null,
          error: new Error(errorMessage),
          loading: false,
        })
        return null
      }
    },
    [requestFn]
  )

  return {
    ...state,
    fetch,
    reset,
  }
} 