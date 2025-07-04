/**
 * Socket.IO configuration and event management
 */

import { WEBSOCKET_CONFIG, SOCKET_EVENTS } from '@/lib/constants';

// Socket connection states
export enum SocketState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error',
}

// Socket event types
export interface SocketEvent<T = any> {
  type: string;
  data: T;
  timestamp: number;
}

// Blitz socket events
export interface BlitzEvents {
  [SOCKET_EVENTS.BLITZ.POINT]: {
    userId: string;
    points: number;
    total: number;
    timestamp: number;
  };
  [SOCKET_EVENTS.BLITZ.STATUS]: {
    status: 'active' | 'inactive' | 'paused';
    participants: number;
    currentRound: number;
  };
  [SOCKET_EVENTS.BLITZ.TRANSACTION]: {
    userId: string;
    transactionHash: string;
    amount: number;
    type: 'buy' | 'sell';
    status: 'pending' | 'confirmed' | 'failed';
  };
  [SOCKET_EVENTS.BLITZ.BALANCE]: {
    userId: string;
    balance: {
      eth: number;
      strk: number;
      points: number;
    };
  };
}

// Fuel socket events
export interface FuelEvents {
  [SOCKET_EVENTS.FUEL.TOTAL_ONLINE]: {
    count: number;
    timestamp: number;
  };
  [SOCKET_EVENTS.FUEL.CURRENT_POOL]: {
    poolId: string;
    totalAmount: number;
    participants: number;
    endTime: number;
  };
  [SOCKET_EVENTS.FUEL.WINNER]: {
    poolId: string;
    winner: {
      address: string;
      username?: string;
    };
    amount: number;
    participants: number;
  };
  [SOCKET_EVENTS.FUEL.CURRENT_JOINED_POOL]: {
    userId: string;
    poolId: string;
    amount: number;
    position: number;
  };
}

// Socket configuration options
export interface SocketOptions {
  url: string;
  autoConnect?: boolean;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  timeout?: number;
  forceNew?: boolean;
  auth?: {
    token?: string;
    userId?: string;
  };
}

// Default socket options
export const DEFAULT_SOCKET_OPTIONS: Partial<SocketOptions> = {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: WEBSOCKET_CONFIG.RECONNECT.ATTEMPTS,
  reconnectionDelay: WEBSOCKET_CONFIG.RECONNECT.DELAY,
  timeout: 20000,
  forceNew: false,
};

// Blitz socket configuration
export const BLITZ_SOCKET_CONFIG: SocketOptions = {
  url: WEBSOCKET_CONFIG.BLITZ_URL,
  ...DEFAULT_SOCKET_OPTIONS,
  auth: {
    // Will be set when user connects wallet
    token: undefined,
    userId: undefined,
  },
};

// Fuel socket configuration
export const FUEL_SOCKET_CONFIG: SocketOptions = {
  url: WEBSOCKET_CONFIG.FUEL_URL,
  ...DEFAULT_SOCKET_OPTIONS,
  // Fuel socket might not require authentication
  auth: undefined,
};

// Socket event handlers type
export type EventHandler<T = any> = (data: T) => void;

// Socket manager interface
export interface SocketManager {
  connect(): Promise<void>;
  disconnect(): void;
  emit<T = any>(event: string, data?: T): void;
  on<T = any>(event: string, handler: EventHandler<T>): void;
  off(event: string, handler?: EventHandler): void;
  getState(): SocketState;
  isConnected(): boolean;
}

// Rate limiting for socket events
export interface RateLimitConfig {
  maxEvents: number;
  windowMs: number;
}

export const SOCKET_RATE_LIMITS: Record<string, RateLimitConfig> = {
  [SOCKET_EVENTS.BLITZ.POINT]: { maxEvents: 100, windowMs: 60000 }, // 100 events per minute
  [SOCKET_EVENTS.BLITZ.TRANSACTION]: { maxEvents: 10, windowMs: 60000 }, // 10 transactions per minute
  [SOCKET_EVENTS.FUEL.CURRENT_JOINED_POOL]: { maxEvents: 5, windowMs: 60000 }, // 5 pool joins per minute
};

// Socket middleware types
export type SocketMiddleware = (event: SocketEvent, next: () => void) => void;

// Built-in middleware
export const socketMiddleware = {
  // Logging middleware
  logger: (): SocketMiddleware => (event, next) => {
    console.log(`[Socket] ${event.type}:`, event.data);
    next();
  },

  // Rate limiting middleware
  rateLimit: (config: RateLimitConfig): SocketMiddleware => {
    const eventCounts = new Map<string, { count: number; timestamp: number }>();
    
    return (event, next) => {
      const now = Date.now();
      const key = event.type;
      const current = eventCounts.get(key);
      
      if (!current || now - current.timestamp > config.windowMs) {
        eventCounts.set(key, { count: 1, timestamp: now });
        next();
      } else if (current.count < config.maxEvents) {
        current.count++;
        next();
      } else {
        console.warn(`[Socket] Rate limit exceeded for event: ${event.type}`);
      }
    };
  },

  // Authentication middleware
  auth: (token: string): SocketMiddleware => (event, next) => {
    if (!token) {
      console.warn('[Socket] Authentication required but no token provided');
      return;
    }
    next();
  },

  // Error handling middleware
  errorHandler: (): SocketMiddleware => (event, next) => {
    try {
      next();
    } catch (error) {
      console.error(`[Socket] Error handling event ${event.type}:`, error);
    }
  },
};

// Socket connection health check
export interface HealthCheck {
  lastPing: number;
  lastPong: number;
  latency: number;
  isHealthy: boolean;
}

// Socket reconnection strategy
export enum ReconnectionStrategy {
  IMMEDIATE = 'immediate',
  LINEAR = 'linear',
  EXPONENTIAL = 'exponential',
  FIBONACCI = 'fibonacci',
}

export interface ReconnectionConfig {
  strategy: ReconnectionStrategy;
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  jitter: boolean;
}

export const DEFAULT_RECONNECTION_CONFIG: ReconnectionConfig = {
  strategy: ReconnectionStrategy.EXPONENTIAL,
  maxAttempts: WEBSOCKET_CONFIG.RECONNECT.ATTEMPTS,
  baseDelay: WEBSOCKET_CONFIG.RECONNECT.DELAY,
  maxDelay: WEBSOCKET_CONFIG.RECONNECT.MAX_DELAY,
  jitter: true,
};

// Calculate reconnection delay based on strategy
export function calculateReconnectionDelay(
  attempt: number,
  config: ReconnectionConfig
): number {
  let delay: number;

  switch (config.strategy) {
    case ReconnectionStrategy.IMMEDIATE:
      delay = 0;
      break;
    case ReconnectionStrategy.LINEAR:
      delay = config.baseDelay * attempt;
      break;
    case ReconnectionStrategy.EXPONENTIAL:
      delay = config.baseDelay * Math.pow(2, attempt);
      break;
    case ReconnectionStrategy.FIBONACCI:
      delay = config.baseDelay * fibonacci(attempt);
      break;
    default:
      delay = config.baseDelay;
  }

  // Apply jitter to avoid thundering herd
  if (config.jitter) {
    delay += Math.random() * config.baseDelay;
  }

  return Math.min(delay, config.maxDelay);
}

// Fibonacci sequence helper
function fibonacci(n: number): number {
  if (n <= 1) return 1;
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

// Socket event queue for offline support
export interface EventQueue {
  add(event: SocketEvent): void;
  flush(): SocketEvent[];
  clear(): void;
  size(): number;
}

export class InMemoryEventQueue implements EventQueue {
  private queue: SocketEvent[] = [];
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  add(event: SocketEvent): void {
    this.queue.push(event);
    if (this.queue.length > this.maxSize) {
      this.queue.shift(); // Remove oldest event
    }
  }

  flush(): SocketEvent[] {
    const events = [...this.queue];
    this.queue = [];
    return events;
  }

  clear(): void {
    this.queue = [];
  }

  size(): number {
    return this.queue.length;
  }
}

// Export types and configurations
export type {
  SocketOptions,
  SocketEvent,
  SocketManager,
  EventHandler,
  BlitzEvents,
  FuelEvents,
  SocketMiddleware,
  HealthCheck,
  ReconnectionConfig,
  EventQueue,
};