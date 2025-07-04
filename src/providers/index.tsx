'use client';

import React from 'react';
import { QueryProvider } from './query-provider';
import { StarknetProvider } from './starknet-provider';
import { SocketProvider } from './socket-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Combined providers component that wraps the entire application
 * Following the provider layering pattern from the documentation:
 * 
 * QueryProvider (Data Fetching)
 *   → StarknetProvider (Blockchain)
 *     → SocketProvider (Real-time Communication)
 *       → children
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <StarknetProvider>
        <SocketProvider>
          {children}
        </SocketProvider>
      </StarknetProvider>
    </QueryProvider>
  );
}