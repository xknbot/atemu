/**
 * Authentication hook for wallet connection and user management
 */

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import { AUTH_CONFIG } from '@/config/api';
import { getStorageItem, setStorageItem } from '@/lib/utils';

// User interface
export interface User {
  id: string;
  walletAddress: string;
  username?: string;
  email?: string;
  profile: {
    avatar?: string;
    bio?: string;
    level: number;
    experience: number;
  };
  preferences: {
    soundEnabled: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
}

// Auth state interface
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Hook return type
export interface UseAuthReturn extends AuthState {
  // Wallet connection
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  
  // Authentication
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  
  // User management
  updateProfile: (updates: Partial<User['profile']>) => Promise<void>;
  updatePreferences: (updates: Partial<User['preferences']>) => Promise<void>;
  
  // Utility functions
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

/**
 * Authentication hook
 */
export function useAuth(): UseAuthReturn {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Get stored auth token
  const getAuthToken = useCallback(() => {
    return getStorageItem<string | null>(AUTH_CONFIG.TOKEN.ACCESS_TOKEN_KEY, null);
  }, []);

  // Store auth token
  const setAuthToken = useCallback((token: string | null) => {
    if (token) {
      setStorageItem(AUTH_CONFIG.TOKEN.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_CONFIG.TOKEN.ACCESS_TOKEN_KEY);
    }
  }, []);

  // Query user profile
  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const token = getAuthToken();
      if (!token) return null;

      const response = await authApi.getProfile();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch user profile');
      }
      return response.data;
    },
    enabled: !!getAuthToken(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  // Connect wallet mutation
  const connectWalletMutation = useMutation({
    mutationFn: async () => {
      // TODO: Implement actual wallet connection when Starknet providers are added
      // This would use Starknet React hooks to connect wallet
      
      // Placeholder implementation
      console.log('Connecting wallet...');
      
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock wallet address
      return '0x1234567890abcdef1234567890abcdef12345678';
    },
    onSuccess: (walletAddress) => {
      console.log('Wallet connected:', walletAddress);
      // TODO: Authenticate with backend using wallet signature
      refetchUser();
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to connect wallet');
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.success && response.data?.accessToken) {
        setAuthToken(response.data.accessToken);
        refetchUser();
        setError(null);
      } else {
        throw new Error(response.error || 'Login failed');
      }
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Login failed');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setAuthToken(null);
      queryClient.clear();
      setError(null);
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Clear local state even if server logout fails
      setAuthToken(null);
      queryClient.clear();
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<User['profile']>) => {
      // TODO: Implement profile update API call
      console.log('Updating profile:', updates);
      return updates;
    },
    onSuccess: () => {
      refetchUser();
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    },
  });

  // Update preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: Partial<User['preferences']>) => {
      // TODO: Implement preferences update API call
      console.log('Updating preferences:', updates);
      return updates;
    },
    onSuccess: () => {
      refetchUser();
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to update preferences');
    },
  });

  // Auto-refresh token
  useEffect(() => {
    const token = getAuthToken();
    if (!token || !user) return;

    const checkTokenExpiry = () => {
      // TODO: Implement token expiry check
      // If token is expiring soon, refresh it
    };

    const interval = setInterval(checkTokenExpiry, AUTH_CONFIG.SESSION.CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [user, getAuthToken]);

  // Utility functions
  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    // TODO: Implement permission checking logic
    return true;
  }, [user]);

  const hasRole = useCallback((role: string): boolean => {
    if (!user) return false;
    // TODO: Implement role checking logic
    return true;
  }, [user]);

  // Main hook functions
  const connectWallet = useCallback(async () => {
    setError(null);
    await connectWalletMutation.mutateAsync();
  }, [connectWalletMutation]);

  const disconnectWallet = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    setError(null);
    await loginMutation.mutateAsync(credentials);
  }, [loginMutation]);

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const refreshAuth = useCallback(async () => {
    await refetchUser();
  }, [refetchUser]);

  const updateProfile = useCallback(async (updates: Partial<User['profile']>) => {
    await updateProfileMutation.mutateAsync(updates);
  }, [updateProfileMutation]);

  const updatePreferences = useCallback(async (updates: Partial<User['preferences']>) => {
    await updatePreferencesMutation.mutateAsync(updates);
  }, [updatePreferencesMutation]);

  return {
    // State
    user: user || null,
    isAuthenticated: !!user,
    isLoading: isLoading || 
               connectWalletMutation.isPending ||
               loginMutation.isPending ||
               logoutMutation.isPending,
    error,

    // Actions
    connectWallet,
    disconnectWallet,
    login,
    logout,
    refreshAuth,
    updateProfile,
    updatePreferences,

    // Utilities
    hasPermission,
    hasRole,
  };
}