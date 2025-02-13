import { useState, useCallback } from 'react'
import { useFetch } from './useFetch'

interface PaginationParams {
  page: number
  limit: number
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  hasMore: boolean
}

interface UsePaginatedFetchResult<T> {
  data: T[]
  error: Error | null
  loading: boolean
  loadingMore: boolean
  hasMore: boolean
  total: number
  fetch: (params?: any) => Promise<void>
  fetchMore: () => Promise<void>
  reset: () => void
}

export function usePaginatedFetch<T>(
  fetchFn: (params: PaginationParams & any) => Promise<PaginatedResponse<T>>,
  pageSize: number = 20
): UsePaginatedFetchResult<T> {
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [allData, setAllData] = useState<T[]>([])

  const { loading, error, fetch: baseFetch, reset: baseReset } = useFetch<PaginatedResponse<T>>(fetchFn)

  const fetch = useCallback(
    async (params?: any) => {
      setPage(1)
      setAllData([])
      const response = await baseFetch({ ...params, page: 1, limit: pageSize })
      if (response) {
        setAllData(response.data)
        setHasMore(response.hasMore)
        setTotal(response.total)
      }
    },
    [baseFetch, pageSize]
  )

  const fetchMore = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return

    setLoadingMore(true)
    const nextPage = page + 1

    try {
      const response = await fetchFn({ page: nextPage, limit: pageSize })
      setPage(nextPage)
      setAllData((prev) => [...prev, ...response.data])
      setHasMore(response.hasMore)
      setTotal(response.total)
    } catch (error) {
      // Keep existing data on error during pagination
      console.error('Error loading more:', error)
    } finally {
      setLoadingMore(false)
    }
  }, [loading, loadingMore, hasMore, page, pageSize, fetchFn])

  const reset = useCallback(() => {
    setPage(1)
    setLoadingMore(false)
    setHasMore(true)
    setTotal(0)
    setAllData([])
    baseReset()
  }, [baseReset])

  return {
    data: allData,
    error,
    loading,
    loadingMore,
    hasMore,
    total,
    fetch,
    fetchMore,
    reset,
  }
} 