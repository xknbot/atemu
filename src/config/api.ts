/**
 * API configuration and environment-specific settings
 */

import { ENVIRONMENT } from '@/lib/constants';

// API Configuration
export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URL: process.env.PUBLIC_NEXT_API || 
    (ENVIRONMENT.IS_PRODUCTION 
      ? 'https://api.atemu.game'
      : ENVIRONMENT.IS_DEVELOPMENT 
        ? 'http://localhost:3000/api'
        : 'https://staging-api.atemu.game'
    ),
    
  // API versioning
  VERSION: 'v1',
  
  // Request timeouts (in milliseconds)
  TIMEOUT: {
    DEFAULT: 10000,
    UPLOAD: 30000,
    DOWNLOAD: 60000,
  },
  
  // Retry configuration
  RETRY: {
    ATTEMPTS: 3,
    DELAY: 1000,
    EXPONENTIAL_BACKOFF: true,
  },
  
  // Rate limiting
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 60,
    BURST_LIMIT: 10,
  },
} as const;

// WebSocket Configuration
export const WEBSOCKET_CONFIG = {
  // Socket URLs
  BLITZ_URL: process.env.PUBLIC_SOCKET_BLITZ || 
    (ENVIRONMENT.IS_PRODUCTION 
      ? 'wss://blitz-socket.atemu.game'
      : 'ws://localhost:3001'
    ),
    
  FUEL_URL: process.env.PUBLIC_SOCKET_FUEL || 
    (ENVIRONMENT.IS_PRODUCTION 
      ? 'wss://fuel-socket.atemu.game'
      : 'ws://localhost:3002'
    ),
  
  // Connection settings
  RECONNECT: {
    ATTEMPTS: 5,
    DELAY: 1000,
    MAX_DELAY: 30000,
    EXPONENTIAL_BACKOFF: true,
  },
  
  // Heartbeat settings
  HEARTBEAT: {
    INTERVAL: 30000,
    TIMEOUT: 5000,
  },
} as const;

// Authentication Configuration
export const AUTH_CONFIG = {
  // Token settings
  TOKEN: {
    ACCESS_TOKEN_KEY: 'access_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
    EXPIRES_IN: 3600, // 1 hour
    REFRESH_THRESHOLD: 300, // 5 minutes before expiry
  },
  
  // Session settings
  SESSION: {
    TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    CHECK_INTERVAL: 60 * 1000, // 1 minute
  },
  
  // OAuth settings (if needed)
  OAUTH: {
    REDIRECT_URI: `${API_CONFIG.BASE_URL}/auth/callback`,
    SCOPE: 'read write',
  },
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  // Cache keys
  KEYS: {
    USER_PROFILE: 'user_profile',
    CARD_COLLECTION: 'card_collection',
    GAME_STATE: 'game_state',
    MARKET_DATA: 'market_data',
  },
  
  // Cache TTL (Time To Live) in seconds
  TTL: {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    STATIC: 86400, // 24 hours
  },
  
  // Cache storage
  STORAGE: {
    MEMORY: 'memory',
    SESSION: 'sessionStorage',
    LOCAL: 'localStorage',
  },
} as const;

// File Upload Configuration
export const UPLOAD_CONFIG = {
  // Allowed file types
  ALLOWED_TYPES: {
    IMAGES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    DOCUMENTS: ['application/pdf', 'text/plain'],
    AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  },
  
  // Size limits (in bytes)
  SIZE_LIMITS: {
    AVATAR: 2 * 1024 * 1024, // 2MB
    CARD_IMAGE: 5 * 1024 * 1024, // 5MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
  },
  
  // Upload endpoints
  ENDPOINTS: {
    AVATAR: '/upload/avatar',
    CARD_IMAGE: '/upload/card',
    DOCUMENT: '/upload/document',
  },
} as const;

// Error Configuration
export const ERROR_CONFIG = {
  // Error codes
  CODES: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  },
  
  // Error messages
  MESSAGES: {
    NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timeout. Please try again.',
    VALIDATION_ERROR: 'Invalid input provided.',
    AUTHENTICATION_ERROR: 'Authentication failed. Please log in again.',
    AUTHORIZATION_ERROR: 'You are not authorized to perform this action.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    UNKNOWN_ERROR: 'An unexpected error occurred.',
  },
  
  // Retry configuration for specific errors
  RETRY_ERRORS: [
    'NETWORK_ERROR',
    'TIMEOUT_ERROR',
    'SERVER_ERROR',
  ],
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  // Monitoring settings
  MONITORING: {
    ENABLED: !ENVIRONMENT.IS_DEVELOPMENT,
    SAMPLE_RATE: 0.1, // 10% sampling
    TRACK_INTERACTIONS: true,
    TRACK_NAVIGATION: true,
  },
  
  // Bundle analysis
  BUNDLE: {
    ANALYZE: ENVIRONMENT.IS_DEVELOPMENT,
    SIZE_THRESHOLD: 1024 * 1024, // 1MB
  },
  
  // Image optimization
  IMAGES: {
    QUALITY: 85,
    FORMATS: ['webp', 'avif', 'jpeg'],
    SIZES: [320, 640, 1024, 1280, 1600],
  },
} as const;

// Feature Flags Configuration
export const FEATURE_FLAGS = {
  // Game features
  BLITZ_MODE: true,
  FUEL_MODE: true,
  SPIN_OF_FATE: true,
  CARD_TRADING: ENVIRONMENT.IS_PRODUCTION,
  
  // UI features
  DARK_MODE: true,
  SOUND_EFFECTS: true,
  ANIMATIONS: true,
  PWA_SUPPORT: true,
  
  // Development features
  DEBUG_MODE: ENVIRONMENT.IS_DEVELOPMENT,
  ANALYTICS: ENVIRONMENT.IS_PRODUCTION,
  ERROR_REPORTING: ENVIRONMENT.IS_PRODUCTION,
} as const;

// Security Configuration
export const SECURITY_CONFIG = {
  // CORS settings
  CORS: {
    ALLOWED_ORIGINS: ENVIRONMENT.IS_PRODUCTION 
      ? ['https://atemu.game', 'https://www.atemu.game']
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    ALLOWED_HEADERS: ['Content-Type', 'Authorization'],
  },
  
  // Content Security Policy
  CSP: {
    ENABLED: ENVIRONMENT.IS_PRODUCTION,
    REPORT_URI: '/api/csp-report',
  },
  
  // Request validation
  VALIDATION: {
    MAX_REQUEST_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_JSON_SIZE: 1024 * 1024, // 1MB
    SANITIZE_HTML: true,
  },
} as const;

// Export combined configuration
export const CONFIG = {
  API: API_CONFIG,
  WEBSOCKET: WEBSOCKET_CONFIG,
  AUTH: AUTH_CONFIG,
  CACHE: CACHE_CONFIG,
  UPLOAD: UPLOAD_CONFIG,
  ERROR: ERROR_CONFIG,
  PERFORMANCE: PERFORMANCE_CONFIG,
  FEATURES: FEATURE_FLAGS,
  SECURITY: SECURITY_CONFIG,
} as const;

// Type exports
export type ApiConfig = typeof API_CONFIG;
export type WebSocketConfig = typeof WEBSOCKET_CONFIG;
export type AuthConfig = typeof AUTH_CONFIG;
export type CacheConfig = typeof CACHE_CONFIG;
export type UploadConfig = typeof UPLOAD_CONFIG;
export type ErrorConfig = typeof ERROR_CONFIG;
export type PerformanceConfig = typeof PERFORMANCE_CONFIG;
export type FeatureFlags = typeof FEATURE_FLAGS;
export type SecurityConfig = typeof SECURITY_CONFIG;