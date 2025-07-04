/**
 * Authentication utilities and JWT management
 */

import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { AUTH_CONFIG } from '@/config/api';

// JWT configuration
const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || 'fallback-secret-for-development',
  ACCESS_TOKEN_EXPIRY: '1h',
  REFRESH_TOKEN_EXPIRY: '7d',
  ISSUER: 'atemu.game',
  AUDIENCE: 'atemu-users',
};

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}

// User payload interface
export interface UserPayload {
  id: string;
  walletAddress: string;
  username?: string;
  email?: string;
  role?: string;
  permissions?: string[];
}

// Token payload interface
export interface TokenPayload extends UserPayload {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  type: 'access' | 'refresh';
}

// Authentication result interface
export interface AuthResult {
  success: boolean;
  user?: UserPayload;
  error?: string;
}

/**
 * Generate JWT access token
 */
export function generateAccessToken(user: UserPayload): string {
  return jwt.sign(
    {
      ...user,
      type: 'access',
    },
    JWT_CONFIG.SECRET,
    {
      expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRY,
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    }
  );
}

/**
 * Generate JWT refresh token
 */
export function generateRefreshToken(user: UserPayload): string {
  return jwt.sign(
    {
      id: user.id,
      walletAddress: user.walletAddress,
      type: 'refresh',
    },
    JWT_CONFIG.SECRET,
    {
      expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRY,
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    }
  );
}

/**
 * Generate both access and refresh tokens
 */
export function generateTokens(user: UserPayload): {
  accessToken: string;
  refreshToken: string;
} {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_CONFIG.SECRET, {
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    }) as TokenPayload;
    
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Verify access token specifically
 */
export function verifyAccessToken(token: string): UserPayload | null {
  const payload = verifyToken(token);
  
  if (!payload || payload.type !== 'access') {
    return null;
  }
  
  return {
    id: payload.id,
    walletAddress: payload.walletAddress,
    username: payload.username,
    email: payload.email,
    role: payload.role,
    permissions: payload.permissions,
  };
}

/**
 * Verify refresh token specifically
 */
export function verifyRefreshToken(token: string): { id: string; walletAddress: string } | null {
  const payload = verifyToken(token);
  
  if (!payload || payload.type !== 'refresh') {
    return null;
  }
  
  return {
    id: payload.id,
    walletAddress: payload.walletAddress,
  };
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

/**
 * Extract token from request
 */
export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  return extractTokenFromHeader(authHeader);
}

/**
 * Authenticate request
 */
export function authenticateRequest(request: NextRequest): AuthResult {
  const token = extractTokenFromRequest(request);
  
  if (!token) {
    return {
      success: false,
      error: 'No authentication token provided',
    };
  }
  
  const user = verifyAccessToken(token);
  
  if (!user) {
    return {
      success: false,
      error: 'Invalid or expired token',
    };
  }
  
  return {
    success: true,
    user,
  };
}

/**
 * Check if token is about to expire
 */
export function isTokenExpiringSoon(token: string, thresholdMinutes: number = 5): boolean {
  const payload = verifyToken(token);
  
  if (!payload) {
    return true; // Consider invalid tokens as expiring
  }
  
  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = payload.exp - now;
  
  return timeUntilExpiry < (thresholdMinutes * 60);
}

/**
 * Hash password using built-in crypto
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}

/**
 * Generate random string for tokens
 */
export function generateRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Create session data
 */
export interface SessionData {
  userId: string;
  walletAddress: string;
  createdAt: number;
  expiresAt: number;
  metadata?: Record<string, any>;
}

/**
 * Session manager for stateful authentication
 */
export class SessionManager {
  private sessions = new Map<string, SessionData>();
  private readonly sessionTimeout = AUTH_CONFIG.SESSION.TIMEOUT;

  /**
   * Create new session
   */
  createSession(user: UserPayload): string {
    const sessionId = generateRandomString(32);
    const now = Date.now();
    
    const sessionData: SessionData = {
      userId: user.id,
      walletAddress: user.walletAddress,
      createdAt: now,
      expiresAt: now + this.sessionTimeout,
    };
    
    this.sessions.set(sessionId, sessionData);
    return sessionId;
  }

  /**
   * Get session data
   */
  getSession(sessionId: string): SessionData | null {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return null;
    }
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      this.sessions.delete(sessionId);
      return null;
    }
    
    return session;
  }

  /**
   * Update session expiry
   */
  refreshSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return false;
    }
    
    session.expiresAt = Date.now() + this.sessionTimeout;
    return true;
  }

  /**
   * Delete session
   */
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  /**
   * Clean up expired sessions
   */
  cleanupExpiredSessions(): number {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [sessionId, session] of this.sessions) {
      if (now > session.expiresAt) {
        this.sessions.delete(sessionId);
        cleanedCount++;
      }
    }
    
    return cleanedCount;
  }
}

// Global session manager instance
export const sessionManager = new SessionManager();

// Cleanup expired sessions every hour
if (typeof window === 'undefined') { // Server-side only
  setInterval(() => {
    const cleaned = sessionManager.cleanupExpiredSessions();
    if (cleaned > 0) {
      console.log(`Cleaned up ${cleaned} expired sessions`);
    }
  }, 60 * 60 * 1000); // 1 hour
}

/**
 * Permission checking utilities
 */
export function hasPermission(user: UserPayload, permission: string): boolean {
  if (!user.permissions) {
    return false;
  }
  
  return user.permissions.includes(permission) || user.permissions.includes('*');
}

export function hasAnyPermission(user: UserPayload, permissions: string[]): boolean {
  return permissions.some(permission => hasPermission(user, permission));
}

export function hasAllPermissions(user: UserPayload, permissions: string[]): boolean {
  return permissions.every(permission => hasPermission(user, permission));
}

/**
 * Role checking utilities
 */
export function hasRole(user: UserPayload, role: string): boolean {
  return user.role === role;
}

export function hasAnyRole(user: UserPayload, roles: string[]): boolean {
  return user.role ? roles.includes(user.role) : false;
}

// Export JWT configuration for reference
export { JWT_CONFIG };