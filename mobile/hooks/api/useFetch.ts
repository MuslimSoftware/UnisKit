import { useState, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

interface UseFetchResult<T> extends FetchState<T> {
  fetch: (params?: any) => Promise<T | null>
  reset: () => void
}

export function useFetch<T>(
  fetchFn: (params?: any) => Promise<T>,
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
        const result = await fetchFn(params)
        setState({ data: result, error: null, loading: false })
        return result
      } catch (error) {
        setState({
          data: null,
          error: error instanceof Error ? error : new Error('An error occurred'),
          loading: false,
        })
        return null
      }
    },
    [fetchFn]
  )

  return {
    ...state,
    fetch,
    reset,
  }
} 