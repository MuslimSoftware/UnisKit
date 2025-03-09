import { useState, useCallback } from 'react'
import { useApi } from './useApi'

interface PaginationParams {
  page: number
  limit: number
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  hasMore: boolean
}

interface UseApiPaginatedOptions<T> {
  pageSize?: number
  onSuccess?: (data: T[]) => void
  onError?: (error: any) => void
}

export function useApiPaginated<T>(
  endpoint: string,
  options: UseApiPaginatedOptions<T> = {}
) {
  const [page, setPage] = useState(1)
  const [allData, setAllData] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)

  const pageSize = options.pageSize || 20

  const api = useApi<PaginatedResponse<T>>('get', endpoint, {
    onSuccess: (response) => {
      setAllData(response.data)
      setHasMore(response.hasMore)
      setTotal(response.total)
      options.onSuccess?.(response.data)
    },
    onError: options.onError,
  })

  const fetch = useCallback(
    async (params?: any) => {
      setPage(1)
      setAllData([])
      const queryParams = new URLSearchParams({
        ...params,
        page: '1',
        limit: pageSize.toString(),
      })
      return api.execute({ params: queryParams.toString() })
    },
    [api, pageSize]
  )

  const fetchMore = useCallback(async () => {
    if (api.loading || loadingMore || !hasMore) return

    setLoadingMore(true)
    const nextPage = page + 1

    try {
      const queryParams = new URLSearchParams({
        page: nextPage.toString(),
        limit: pageSize.toString(),
      })
      const response = await api.execute({ params: queryParams.toString() })

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
  }, [api, loadingMore, hasMore, page, pageSize])

  const reset = useCallback(() => {
    setPage(1)
    setAllData([])
    setHasMore(true)
    setTotal(0)
    setLoadingMore(false)
    api.reset()
  }, [api])

  return {
    data: allData,
    error: api.error,
    loading: api.loading,
    loadingMore,
    hasMore,
    total,
    fetch,
    fetchMore,
    reset,
  }
} 