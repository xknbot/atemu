/**
 * API utility functions and configurations
 */

import { API_CONFIG, API_ENDPOINTS } from './constants';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Request configuration
export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

// Custom API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Get auth token from storage
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

// Default headers
function getDefaultHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
}

// API client with retry logic
export async function apiClient<T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = API_CONFIG.TIMEOUT,
    retries = API_CONFIG.RETRY_ATTEMPTS,
  } = config;

  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const requestHeaders = { ...getDefaultHeaders(), ...headers };
  
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const requestConfig: RequestInit = {
    method,
    headers: requestHeaders,
    signal: controller.signal,
  };

  if (body && method !== 'GET') {
    requestConfig.body = JSON.stringify(body);
  }

  let lastError: Error;

  // Retry logic
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, requestConfig);
      clearTimeout(timeoutId);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new ApiError(
          data?.error || data?.message || `HTTP ${response.status}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        break;
      }
      
      // Don't retry on last attempt
      if (attempt === retries) {
        break;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  clearTimeout(timeoutId);
  
  // Transform error to consistent format
  if (lastError instanceof ApiError) {
    return {
      success: false,
      error: lastError.message,
    };
  }
  
  return {
    success: false,
    error: lastError?.message || 'An unexpected error occurred',
  };
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, config?: Omit<RequestConfig, 'method'>) =>
    apiClient<T>(endpoint, { ...config, method: 'GET' }),

  post: <T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    apiClient<T>(endpoint, { ...config, method: 'POST', body }),

  put: <T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    apiClient<T>(endpoint, { ...config, method: 'PUT', body }),

  patch: <T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    apiClient<T>(endpoint, { ...config, method: 'PATCH', body }),

  delete: <T = any>(endpoint: string, config?: Omit<RequestConfig, 'method'>) =>
    apiClient<T>(endpoint, { ...config, method: 'DELETE' }),
};

// Authentication API
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  logout: () =>
    api.post(API_ENDPOINTS.AUTH.LOGOUT),

  refresh: () =>
    api.post(API_ENDPOINTS.AUTH.REFRESH),

  getProfile: () =>
    api.get(API_ENDPOINTS.AUTH.PROFILE),
};

// Cards API
export const cardsApi = {
  getCards: (params?: { page?: number; limit?: number; rarity?: string; faction?: string }) =>
    api.get(`${API_ENDPOINTS.CARDS.LIST}${params ? `?${new URLSearchParams(params as any)}` : ''}`),

  getCard: (id: string) =>
    api.get(API_ENDPOINTS.CARDS.DETAIL.replace(':id', id)),

  getCollection: () =>
    api.get(API_ENDPOINTS.CARDS.COLLECTION),

  getDeck: () =>
    api.get(API_ENDPOINTS.CARDS.DECK),

  saveDeck: (deck: { name: string; cardIds: string[] }) =>
    api.post(API_ENDPOINTS.CARDS.DECK, deck),
};

// Game API
export const gameApi = {
  createGame: (config: { mode: string; settings?: any }) =>
    api.post(API_ENDPOINTS.GAME.CREATE, config),

  joinGame: (gameId: string) =>
    api.post(API_ENDPOINTS.GAME.JOIN, { gameId }),

  leaveGame: (gameId: string) =>
    api.post(API_ENDPOINTS.GAME.LEAVE, { gameId }),

  getGameStatus: (gameId: string) =>
    api.get(`${API_ENDPOINTS.GAME.STATUS}?gameId=${gameId}`),
};

// Blitz API
export const blitzApi = {
  start: () =>
    api.post(API_ENDPOINTS.BLITZ.START),

  stop: () =>
    api.post(API_ENDPOINTS.BLITZ.STOP),

  getStatus: () =>
    api.get(API_ENDPOINTS.BLITZ.STATUS),

  getHistory: (params?: { page?: number; limit?: number }) =>
    api.get(`${API_ENDPOINTS.BLITZ.HISTORY}${params ? `?${new URLSearchParams(params as any)}` : ''}`),
};

// Fuel API
export const fuelApi = {
  joinPool: (poolId: string) =>
    api.post(API_ENDPOINTS.FUEL.JOIN_POOL, { poolId }),

  leavePool: (poolId: string) =>
    api.post(API_ENDPOINTS.FUEL.LEAVE_POOL, { poolId }),

  getPoolStatus: (poolId?: string) =>
    api.get(`${API_ENDPOINTS.FUEL.POOL_STATUS}${poolId ? `?poolId=${poolId}` : ''}`),

  getHistory: (params?: { page?: number; limit?: number }) =>
    api.get(`${API_ENDPOINTS.FUEL.HISTORY}${params ? `?${new URLSearchParams(params as any)}` : ''}`),
};

// Helper function to handle file uploads
export async function uploadFile(file: File, endpoint: string): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append('file', file);

  const headers = { ...getDefaultHeaders() };
  delete headers['Content-Type']; // Let browser set multipart boundary

  return apiClient(endpoint, {
    method: 'POST',
    headers,
    body: formData,
  });
}

// Helper function to download file
export async function downloadFile(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}