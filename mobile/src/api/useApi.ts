import { useState, useCallback, useRef, useEffect } from 'react'
import { ApiResponse, ApiError } from '@/api/types/api.types'

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

export function useApi<T, Args extends any[]>(
  apiFunction: (...args: [...Args, { signal?: AbortSignal }]) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const [state, setState] = useState<ApiState<T>>({
    data: options.initialData || null,
    error: null,
    loading: false,
  });
  
  // Use ref to persist controller between renders
  const controllerRef = useRef<AbortController | null>(null);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const execute = useCallback(
    async (...args: Args) => {
      // Abort previous request if it exists
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      
      // Create new controller for this request
      controllerRef.current = new AbortController();
      
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args, { signal: controllerRef.current.signal });
        setState({ data: response.data, error: null, loading: false });
        options.onSuccess?.(response.data);
        return response.data;
      } catch (error) {
        // Don't set error state if aborted (component unmounted or request canceled)
        if (error instanceof Error && error.name === 'AbortError') return null;
        
        const apiError = error as ApiError;
        setState({
          data: null,
          error: apiError,
          loading: false,
        });
        options.onError?.(apiError);
        throw apiError;
      }
    },
    [apiFunction, options.onSuccess, options.onError]
  );

  const cancel = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, []);

  const reset = useCallback(() => {
    setState({
      data: options.initialData || null,
      error: null,
      loading: false,
    });
  }, [options.initialData]);

  return {
    ...state,
    execute,
    cancel,
    reset,
  };
}