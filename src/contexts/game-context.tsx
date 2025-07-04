'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

// Game state interface
export interface GameState {
  currentMode: 'blitz' | 'fuel' | 'spin-of-fate' | null;
  isInGame: boolean;
  gameSession: GameSession | null;
  settings: GameSettings;
  stats: GameStats;
}

// Game session interface
export interface GameSession {
  id: string;
  mode: string;
  status: 'waiting' | 'active' | 'paused' | 'completed';
  startTime: Date;
  endTime?: Date;
  players: Player[];
  currentPlayer?: string;
  metadata: Record<string, any>;
}

// Player interface
export interface Player {
  id: string;
  walletAddress: string;
  username?: string;
  avatar?: string;
  isReady: boolean;
  score?: number;
}

// Game settings interface
export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationsEnabled: boolean;
  autoPlay: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  notifications: boolean;
}

// Game stats interface
export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  averageScore: number;
  winRate: number;
  favoriteMode: string | null;
  timeSpent: number; // in milliseconds
}

// Game actions
type GameAction =
  | { type: 'START_GAME'; payload: { mode: string; sessionId: string } }
  | { type: 'END_GAME'; payload: { result: any } }
  | { type: 'UPDATE_SESSION'; payload: Partial<GameSession> }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<GameSettings> }
  | { type: 'UPDATE_STATS'; payload: Partial<GameStats> }
  | { type: 'ADD_PLAYER'; payload: Player }
  | { type: 'REMOVE_PLAYER'; payload: string }
  | { type: 'SET_CURRENT_MODE'; payload: 'blitz' | 'fuel' | 'spin-of-fate' | null }
  | { type: 'RESET_GAME' };

// Initial state
const initialState: GameState = {
  currentMode: null,
  isInGame: false,
  gameSession: null,
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    animationsEnabled: true,
    autoPlay: false,
    difficulty: 'medium',
    notifications: true,
  },
  stats: {
    gamesPlayed: 0,
    gamesWon: 0,
    totalScore: 0,
    averageScore: 0,
    winRate: 0,
    favoriteMode: null,
    timeSpent: 0,
  },
};

// Game reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        currentMode: action.payload.mode as any,
        isInGame: true,
        gameSession: {
          id: action.payload.sessionId,
          mode: action.payload.mode,
          status: 'waiting',
          startTime: new Date(),
          players: [],
          metadata: {},
        },
      };

    case 'END_GAME':
      const wasWin = action.payload.result?.winner === state.gameSession?.currentPlayer;
      return {
        ...state,
        isInGame: false,
        gameSession: state.gameSession ? {
          ...state.gameSession,
          status: 'completed',
          endTime: new Date(),
        } : null,
        stats: {
          ...state.stats,
          gamesPlayed: state.stats.gamesPlayed + 1,
          gamesWon: wasWin ? state.stats.gamesWon + 1 : state.stats.gamesWon,
          winRate: ((wasWin ? state.stats.gamesWon + 1 : state.stats.gamesWon) / (state.stats.gamesPlayed + 1)) * 100,
        },
      };

    case 'UPDATE_SESSION':
      return {
        ...state,
        gameSession: state.gameSession ? {
          ...state.gameSession,
          ...action.payload,
        } : null,
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload,
        },
      };

    case 'ADD_PLAYER':
      return {
        ...state,
        gameSession: state.gameSession ? {
          ...state.gameSession,
          players: [...state.gameSession.players, action.payload],
        } : null,
      };

    case 'REMOVE_PLAYER':
      return {
        ...state,
        gameSession: state.gameSession ? {
          ...state.gameSession,
          players: state.gameSession.players.filter(p => p.id !== action.payload),
        } : null,
      };

    case 'SET_CURRENT_MODE':
      return {
        ...state,
        currentMode: action.payload,
      };

    case 'RESET_GAME':
      return {
        ...state,
        currentMode: null,
        isInGame: false,
        gameSession: null,
      };

    default:
      return state;
  }
}

// Context interface
export interface GameContextType {
  state: GameState;
  
  // Game actions
  startGame: (mode: string) => void;
  endGame: (result: any) => void;
  joinGame: (sessionId: string) => void;
  leaveGame: () => void;
  
  // Session management
  updateSession: (updates: Partial<GameSession>) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  
  // Settings
  updateSettings: (settings: Partial<GameSettings>) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleAnimations: () => void;
  
  // Mode selection
  setCurrentMode: (mode: 'blitz' | 'fuel' | 'spin-of-fate' | null) => void;
  
  // Utilities
  isPlayerInGame: (playerId: string) => boolean;
  getPlayerScore: (playerId: string) => number;
  canStartGame: () => boolean;
}

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider props
interface GameProviderProps {
  children: React.ReactNode;
}

// Game provider component
export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { user } = useAuth();

  // Load user settings and stats on mount
  useEffect(() => {
    if (user) {
      // TODO: Load user's game settings and stats from API or localStorage
      // For now, we'll use default values
    }
  }, [user]);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gameSettings', JSON.stringify(state.settings));
    }
  }, [state.settings]);

  // Game actions
  const startGame = (mode: string) => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    dispatch({ type: 'START_GAME', payload: { mode, sessionId } });
  };

  const endGame = (result: any) => {
    dispatch({ type: 'END_GAME', payload: { result } });
  };

  const joinGame = (sessionId: string) => {
    // TODO: Implement actual game joining logic
    console.log('Joining game:', sessionId);
  };

  const leaveGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  // Session management
  const updateSession = (updates: Partial<GameSession>) => {
    dispatch({ type: 'UPDATE_SESSION', payload: updates });
  };

  const addPlayer = (player: Player) => {
    dispatch({ type: 'ADD_PLAYER', payload: player });
  };

  const removePlayer = (playerId: string) => {
    dispatch({ type: 'REMOVE_PLAYER', payload: playerId });
  };

  // Settings
  const updateSettings = (settings: Partial<GameSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !state.settings.soundEnabled });
  };

  const toggleMusic = () => {
    updateSettings({ musicEnabled: !state.settings.musicEnabled });
  };

  const toggleAnimations = () => {
    updateSettings({ animationsEnabled: !state.settings.animationsEnabled });
  };

  // Mode selection
  const setCurrentMode = (mode: 'blitz' | 'fuel' | 'spin-of-fate' | null) => {
    dispatch({ type: 'SET_CURRENT_MODE', payload: mode });
  };

  // Utilities
  const isPlayerInGame = (playerId: string): boolean => {
    return state.gameSession?.players.some(p => p.id === playerId) || false;
  };

  const getPlayerScore = (playerId: string): number => {
    const player = state.gameSession?.players.find(p => p.id === playerId);
    return player?.score || 0;
  };

  const canStartGame = (): boolean => {
    return !state.isInGame && state.currentMode !== null;
  };

  const value: GameContextType = {
    state,
    startGame,
    endGame,
    joinGame,
    leaveGame,
    updateSession,
    addPlayer,
    removePlayer,
    updateSettings,
    toggleSound,
    toggleMusic,
    toggleAnimations,
    setCurrentMode,
    isPlayerInGame,
    getPlayerScore,
    canStartGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

// Hook to use game context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}