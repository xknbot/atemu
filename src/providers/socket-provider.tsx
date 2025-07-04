'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { WEBSOCKET_CONFIG } from '@/config/socket';

// Socket context types
interface SocketContextType {
  blitzSocket: any | null;
  fuelSocket: any | null;
  isBlitzConnected: boolean;
  isFuelConnected: boolean;
  connectBlitz: () => void;
  disconnectBlitz: () => void;
  connectFuel: () => void;
  disconnectFuel: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [blitzSocket, setBlitzSocket] = useState<any | null>(null);
  const [fuelSocket, setFuelSocket] = useState<any | null>(null);
  const [isBlitzConnected, setIsBlitzConnected] = useState(false);
  const [isFuelConnected, setIsFuelConnected] = useState(false);

  // TODO: Implement actual socket connections when socket.io-client is added
  // This is a placeholder implementation

  const connectBlitz = () => {
    console.log('Connecting to Blitz socket...', WEBSOCKET_CONFIG.BLITZ_URL);
    // TODO: Implement actual socket connection
    setIsBlitzConnected(true);
  };

  const disconnectBlitz = () => {
    console.log('Disconnecting from Blitz socket...');
    if (blitzSocket) {
      // TODO: Implement actual socket disconnection
      setBlitzSocket(null);
    }
    setIsBlitzConnected(false);
  };

  const connectFuel = () => {
    console.log('Connecting to Fuel socket...', WEBSOCKET_CONFIG.FUEL_URL);
    // TODO: Implement actual socket connection
    setIsFuelConnected(true);
  };

  const disconnectFuel = () => {
    console.log('Disconnecting from Fuel socket...');
    if (fuelSocket) {
      // TODO: Implement actual socket disconnection
      setFuelSocket(null);
    }
    setIsFuelConnected(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectBlitz();
      disconnectFuel();
    };
  }, []);

  const value: SocketContextType = {
    blitzSocket,
    fuelSocket,
    isBlitzConnected,
    isFuelConnected,
    connectBlitz,
    disconnectBlitz,
    connectFuel,
    disconnectFuel,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

// Hook to use socket context
export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

// Individual socket hooks
export function useBlitzSocket() {
  const { blitzSocket, isBlitzConnected, connectBlitz, disconnectBlitz } = useSocket();
  return { blitzSocket, isConnected: isBlitzConnected, connect: connectBlitz, disconnect: disconnectBlitz };
}

export function useFuelSocket() {
  const { fuelSocket, isFuelConnected, connectFuel, disconnectFuel } = useSocket();
  return { fuelSocket, isConnected: isFuelConnected, connect: connectFuel, disconnect: disconnectFuel };
}

// Example of what this would look like with actual Socket.IO:
/*
import { io, Socket } from 'socket.io-client';

// In the provider:
const connectBlitz = () => {
  if (blitzSocket?.connected) return;
  
  const socket = io(WEBSOCKET_CONFIG.BLITZ_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: WEBSOCKET_CONFIG.RECONNECT.ATTEMPTS,
    reconnectionDelay: WEBSOCKET_CONFIG.RECONNECT.DELAY,
  });

  socket.on('connect', () => {
    console.log('Connected to Blitz socket');
    setIsBlitzConnected(true);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from Blitz socket');
    setIsBlitzConnected(false);
  });

  setBlitzSocket(socket);
};
*/