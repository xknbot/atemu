/**
 * Application constants for the Atemu trading card game
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.PUBLIC_NEXT_API || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Socket Configuration
export const SOCKET_CONFIG = {
  BLITZ_URL: process.env.PUBLIC_SOCKET_BLITZ || 'ws://localhost:3001',
  FUEL_URL: process.env.PUBLIC_SOCKET_FUEL || 'ws://localhost:3002',
  RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 1000,
} as const;

// Game Configuration
export const GAME_CONFIG = {
  MODES: {
    BLITZ: 'blitz',
    FUEL: 'fuel',
    SPIN_OF_FATE: 'spin-of-fate',
  },
  MAX_CARDS_PER_DECK: 30,
  MIN_CARDS_PER_DECK: 20,
  ENERGY_TYPES: ['Fire', 'Water', 'Earth', 'Air', 'Dark', 'Light'],
} as const;

// Contract Addresses (Testnet)
export const CONTRACTS = {
  TESTNET: {
    ETH: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    STRK: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    BLIZT_POINT: '0x...',
    FUEL_TOKEN: '0x...',
  },
  MAINNET: {
    ETH: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    STRK: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    BLIZT_POINT: '0x...',
    FUEL_TOKEN: '0x...',
  },
} as const;

// RPC Endpoints
export const RPC_ENDPOINTS = {
  TESTNET: [
    'https://starknet-testnet.public.blastapi.io',
    'https://starknet-testnet.g.alchemy.com/v2/demo',
  ],
  MAINNET: [
    'https://starknet-mainnet.public.blastapi.io',
    'https://starknet-mainnet.g.alchemy.com/v2/demo',
  ],
} as const;

// Wallet Configuration
export const WALLET_CONFIG = {
  SUPPORTED_WALLETS: ['argentX', 'braavos', 'argentMobile'],
  CONNECT_TIMEOUT: 30000,
  AUTO_CONNECT: true,
} as const;

// UI Constants
export const UI_CONFIG = {
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    TOAST: 1080,
  },
} as const;

// Gaming Constants
export const CARD_RARITIES = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
  MYTHIC: 'mythic',
} as const;

export const CARD_TYPES = {
  CREATURE: 'creature',
  SPELL: 'spell',
  ARTIFACT: 'artifact',
  ENCHANTMENT: 'enchantment',
} as const;

export const FACTIONS = {
  EGYPT: 'egypt',
  GREECE: 'greece',
  VIKING: 'viking',
  JAPAN: 'japan',
  HELL: 'hell',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet first',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_INPUT: 'Invalid input provided',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  CARD_NOT_FOUND: 'Card not found',
  DECK_FULL: 'Your deck is full',
  GAME_NOT_FOUND: 'Game session not found',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully',
  TRANSACTION_SUCCESS: 'Transaction completed successfully',
  CARD_ADDED: 'Card added to your collection',
  DECK_SAVED: 'Deck saved successfully',
  GAME_JOINED: 'Successfully joined the game',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  WALLET_ADDRESS: 'wallet_address',
  USER_PREFERENCES: 'user_preferences',
  GAME_SETTINGS: 'game_settings',
  DECK_BUILDER: 'deck_builder',
  THEME: 'theme',
  SOUND_ENABLED: 'sound_enabled',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  CARDS: {
    LIST: '/cards',
    DETAIL: '/cards/:id',
    COLLECTION: '/cards/collection',
    DECK: '/cards/deck',
  },
  GAME: {
    CREATE: '/game/create',
    JOIN: '/game/join',
    LEAVE: '/game/leave',
    STATUS: '/game/status',
  },
  BLITZ: {
    START: '/blitz/start',
    STOP: '/blitz/stop',
    STATUS: '/blitz/status',
    HISTORY: '/blitz/history',
  },
  FUEL: {
    JOIN_POOL: '/fuel/join',
    LEAVE_POOL: '/fuel/leave',
    POOL_STATUS: '/fuel/status',
    HISTORY: '/fuel/history',
  },
} as const;

// Socket Events
export const SOCKET_EVENTS = {
  BLITZ: {
    POINT: 'BLIZT_POINT',
    STATUS: 'BLIZT_STATUS',
    TRANSACTION: 'BLIZT_TRANSACTION',
    BALANCE: 'BLIZT_BALANCE',
  },
  FUEL: {
    TOTAL_ONLINE: 'TOTAL_ONLINE',
    CURRENT_POOL: 'CURRENT_POOL',
    WINNER: 'WINNER',
    CURRENT_JOINED_POOL: 'CURRENT_JOINED_POOL',
  },
} as const;

// Environment
export const ENVIRONMENT = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const;

// Regex Patterns
export const REGEX_PATTERNS = {
  WALLET_ADDRESS: /^0x[a-fA-F0-9]{63,64}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
} as const;