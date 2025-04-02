import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { ApiResponse, ApiError } from '@/api/types/api.types'

interface ApiState<T> {
  data: T | null
  error: ApiError | null
  loading: boolean
}

interface UseApiOptions<T> {
  /** Callback fired when the API call succeeds */
  onSuccess?: (data: T) => void
  /** Callback fired when the API call fails */
  onError?: (error: ApiError) => void
  /** Initial data to populate the hook with */
  initialData?: T | null
  /** Whether to execute the API call immediately */
  immediate?: boolean
}

interface UseApiResult<T, Args extends any[]> extends ApiState<T> {
  /** Execute the API call with the given arguments */
  execute: (...args: Args) => Promise<T | null>
  /** Cancel any ongoing API call */
  cancel: () => void
  /** Reset the hook state to initial values */
  reset: () => void
}

/**
 * Custom hook for managing API calls with automatic cancellation and state management
 * @param apiFunction - The API function to call
 * @param options - Configuration options for the hook
 * @returns Object containing API state and control functions
 */
export function useApi<T, Args extends any[]>(
  apiFunction: (...args: [...Args, { signal?: AbortSignal }]) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
): UseApiResult<T, Args> {
  // Hook state
  const [state, setState] = useState<ApiState<T>>({
    data: options.initialData ?? null,
    error: null,
    loading: false,
  });

  // Controller management
  const controllerRef = useRef<AbortController | null>(null);

  const abortCurrentRequest = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => abortCurrentRequest();
  }, [abortCurrentRequest]);

  // Main execution function
  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      // Cancel any ongoing request
      abortCurrentRequest();
      
      // Setup new request
      controllerRef.current = new AbortController();
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args, { 
          signal: controllerRef.current.signal 
        });

        // Handle successful response
        const responseData = response.data;
        setState({ data: responseData, error: null, loading: false });
        options.onSuccess?.(responseData);
        return responseData;
      } catch (error) {
        // Handle abort cases
        if (error instanceof Error && error.name === 'AbortError') {
          return null;
        }
        
        // Handle API errors
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
    [apiFunction, options.onSuccess, options.onError, abortCurrentRequest]
  );

  // Cancel ongoing request and reset loading state
  const cancel = useCallback(() => {
    abortCurrentRequest();
    setState(prev => ({ ...prev, loading: false }));
  }, [abortCurrentRequest]);

  // Reset hook state to initial values
  const reset = useCallback(() => {
    setState({
      data: options.initialData ?? null,
      error: null,
      loading: false,
    });
  }, [options.initialData]);

  // --- Debugging Refs for useApi (Place AFTER function definitions) --- 
  const prevExecuteRef = useRef(execute);
  const prevResetRef = useRef(reset);
  // --- End Debugging Refs ---

  // --- Debugging useEffect for execute identity --- 
  useEffect(() => {
    if (prevExecuteRef.current !== execute) {
      console.log('[useApi Debug] execute function identity changed');
      prevExecuteRef.current = execute;
    }
  }, [execute]);
  // --- End Debugging useEffect ---

  // --- Debugging useEffect for reset identity --- 
  useEffect(() => {
    if (prevResetRef.current !== reset) {
      console.log('[useApi Debug] reset function identity changed');
      prevResetRef.current = reset;
    }
  }, [reset]);
  // --- End Debugging useEffect ---

  // Return state values directly and memoized functions
  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    cancel,
    reset,
  };
}