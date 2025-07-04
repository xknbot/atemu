/**
 * Hook for managing user token balances and blockchain interactions
 */

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { formatCurrency, fromWei, toWei } from '@/lib/utils';

// Token balance interface
export interface TokenBalance {
  symbol: string;
  name: string;
  address: string;
  balance: string;
  decimals: number;
  formattedBalance: string;
  usdValue?: number;
}

// Supported tokens
export enum SupportedTokens {
  ETH = 'ETH',
  STRK = 'STRK',
  BLIZT_POINT = 'BLIZT_POINT',
  FUEL = 'FUEL',
}

// Hook return type
export interface UseBalanceReturn {
  // Balances
  balances: Record<SupportedTokens, TokenBalance | null>;
  totalUsdValue: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  refreshBalances: () => Promise<void>;
  transfer: (token: SupportedTokens, to: string, amount: string) => Promise<void>;
  approve: (token: SupportedTokens, spender: string, amount: string) => Promise<void>;
  
  // Utilities
  getBalance: (token: SupportedTokens) => TokenBalance | null;
  getFormattedBalance: (token: SupportedTokens) => string;
  hasBalance: (token: SupportedTokens, amount: string) => boolean;
}

/**
 * Balance management hook
 */
export function useBalance(): UseBalanceReturn {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Mock token data - would be replaced with actual contract addresses
  const tokenData = {
    [SupportedTokens.ETH]: {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      decimals: 18,
    },
    [SupportedTokens.STRK]: {
      symbol: 'STRK',
      name: 'Starknet Token',
      address: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
      decimals: 18,
    },
    [SupportedTokens.BLIZT_POINT]: {
      symbol: 'BLIZT',
      name: 'Blitz Points',
      address: '0x...', // Would be actual contract address
      decimals: 18,
    },
    [SupportedTokens.FUEL]: {
      symbol: 'FUEL',
      name: 'Fuel Token',
      address: '0x...', // Would be actual contract address
      decimals: 18,
    },
  };

  // Fetch balances query
  const {
    data: balances = {} as Record<SupportedTokens, TokenBalance | null>,
    isLoading,
    refetch: refetchBalances,
  } = useQuery({
    queryKey: ['balances', user?.walletAddress],
    queryFn: async (): Promise<Record<SupportedTokens, TokenBalance | null>> => {
      if (!user?.walletAddress) {
        throw new Error('Wallet not connected');
      }

      // TODO: Implement actual balance fetching when Starknet contracts are integrated
      // This would use Starknet contract calls to get balances
      
      // Mock implementation
      const mockBalances: Record<SupportedTokens, TokenBalance | null> = {
        [SupportedTokens.ETH]: {
          ...tokenData[SupportedTokens.ETH],
          balance: toWei('1.5'), // 1.5 ETH
          formattedBalance: formatCurrency(1.5, 'ETH'),
          usdValue: 1.5 * 2000, // Mock USD price
        },
        [SupportedTokens.STRK]: {
          ...tokenData[SupportedTokens.STRK],
          balance: toWei('100'), // 100 STRK
          formattedBalance: formatCurrency(100, 'STRK'),
          usdValue: 100 * 1.5, // Mock USD price
        },
        [SupportedTokens.BLIZT_POINT]: {
          ...tokenData[SupportedTokens.BLIZT_POINT],
          balance: toWei('500'), // 500 BLIZT
          formattedBalance: formatCurrency(500, 'BLIZT'),
          usdValue: 0, // Points have no USD value
        },
        [SupportedTokens.FUEL]: {
          ...tokenData[SupportedTokens.FUEL],
          balance: toWei('25'), // 25 FUEL
          formattedBalance: formatCurrency(25, 'FUEL'),
          usdValue: 25 * 0.5, // Mock USD price
        },
      };

      return mockBalances;
    },
    enabled: isAuthenticated && !!user?.walletAddress,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Refetch every minute
  });

  // Calculate total USD value
  const totalUsdValue = Object.values(balances)
    .filter(Boolean)
    .reduce((total, balance) => total + (balance!.usdValue || 0), 0);

  // Transfer mutation
  const transferMutation = useMutation({
    mutationFn: async ({
      token,
      to,
      amount,
    }: {
      token: SupportedTokens;
      to: string;
      amount: string;
    }) => {
      if (!user?.walletAddress) {
        throw new Error('Wallet not connected');
      }

      // TODO: Implement actual transfer when Starknet integration is added
      console.log(`Transferring ${amount} ${token} to ${to}`);
      
      // Mock transfer - simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { txHash: '0x123...abc' };
    },
    onSuccess: () => {
      // Refresh balances after successful transfer
      refetchBalances();
      setError(null);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Transfer failed');
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async ({
      token,
      spender,
      amount,
    }: {
      token: SupportedTokens;
      spender: string;
      amount: string;
    }) => {
      if (!user?.walletAddress) {
        throw new Error('Wallet not connected');
      }

      // TODO: Implement actual approval when Starknet integration is added
      console.log(`Approving ${amount} ${token} for ${spender}`);
      
      // Mock approval - simulate transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { txHash: '0x456...def' };
    },
    onSuccess: () => {
      setError(null);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Approval failed');
    },
  });

  // Utility functions
  const getBalance = useCallback((token: SupportedTokens): TokenBalance | null => {
    return balances[token] || null;
  }, [balances]);

  const getFormattedBalance = useCallback((token: SupportedTokens): string => {
    const balance = getBalance(token);
    return balance?.formattedBalance || '0.0000';
  }, [getBalance]);

  const hasBalance = useCallback((token: SupportedTokens, amount: string): boolean => {
    const balance = getBalance(token);
    if (!balance) return false;
    
    const balanceNum = fromWei(balance.balance, balance.decimals);
    const amountNum = parseFloat(amount);
    
    return balanceNum >= amountNum;
  }, [getBalance]);

  // Main hook functions
  const refreshBalances = useCallback(async () => {
    setError(null);
    await refetchBalances();
  }, [refetchBalances]);

  const transfer = useCallback(async (
    token: SupportedTokens,
    to: string,
    amount: string
  ) => {
    setError(null);
    
    // Validate amount
    if (!hasBalance(token, amount)) {
      throw new Error(`Insufficient ${token} balance`);
    }
    
    await transferMutation.mutateAsync({ token, to, amount });
  }, [transferMutation, hasBalance]);

  const approve = useCallback(async (
    token: SupportedTokens,
    spender: string,
    amount: string
  ) => {
    setError(null);
    await approveMutation.mutateAsync({ token, spender, amount });
  }, [approveMutation]);

  return {
    // State
    balances,
    totalUsdValue,
    isLoading: isLoading || transferMutation.isPending || approveMutation.isPending,
    error,

    // Actions
    refreshBalances,
    transfer,
    approve,

    // Utilities
    getBalance,
    getFormattedBalance,
    hasBalance,
  };
}