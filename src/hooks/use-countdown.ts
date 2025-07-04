/**
 * Countdown timer hook for game mechanics and time-based features
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Countdown configuration interface
export interface CountdownConfig {
  targetDate?: Date;
  duration?: number; // in milliseconds
  interval?: number; // update interval in milliseconds
  onComplete?: () => void;
  onTick?: (timeLeft: TimeLeft) => void;
  autoStart?: boolean;
}

// Time left interface
export interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

// Hook return type
export interface UseCountdownReturn {
  timeLeft: TimeLeft;
  isActive: boolean;
  isCompleted: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setTarget: (date: Date) => void;
  setDuration: (ms: number) => void;
  getFormattedTime: (format?: string) => string;
}

/**
 * Calculate time left from target date or duration
 */
function calculateTimeLeft(targetDate: Date | null, startTime: number | null, duration: number | null): TimeLeft {
  let timeLeft = 0;

  if (targetDate) {
    timeLeft = targetDate.getTime() - Date.now();
  } else if (startTime && duration) {
    timeLeft = (startTime + duration) - Date.now();
  }

  timeLeft = Math.max(0, timeLeft);

  return {
    total: timeLeft,
    days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
    milliseconds: timeLeft % 1000,
  };
}

/**
 * Countdown hook
 */
export function useCountdown(config: CountdownConfig = {}): UseCountdownReturn {
  const {
    targetDate,
    duration,
    interval = 1000,
    onComplete,
    onTick,
    autoStart = false,
  } = config;

  const [isActive, setIsActive] = useState(autoStart);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTargetDate, setCurrentTargetDate] = useState<Date | null>(targetDate || null);
  const [currentDuration, setCurrentDuration] = useState<number | null>(duration || null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  // Update refs when callbacks change
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);

  // Calculate current time left
  const timeLeft = calculateTimeLeft(currentTargetDate, startTime, currentDuration);
  const isCompleted = timeLeft.total === 0;

  // Handle countdown completion
  useEffect(() => {
    if (isCompleted && isActive) {
      setIsActive(false);
      onCompleteRef.current?.();
    }
  }, [isCompleted, isActive]);

  // Handle tick callback
  useEffect(() => {
    if (isActive) {
      onTickRef.current?.(timeLeft);
    }
  }, [timeLeft, isActive]);

  // Start countdown
  const start = useCallback(() => {
    if (isCompleted) return;
    
    setIsActive(true);
    setStartTime(Date.now());
  }, [isCompleted]);

  // Pause countdown
  const pause = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Resume countdown
  const resume = useCallback(() => {
    if (isCompleted) return;
    setIsActive(true);
  }, [isCompleted]);

  // Reset countdown
  const reset = useCallback(() => {
    setIsActive(false);
    setStartTime(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Set new target date
  const setTarget = useCallback((date: Date) => {
    setCurrentTargetDate(date);
    setCurrentDuration(null);
    setStartTime(null);
  }, []);

  // Set new duration
  const setDuration = useCallback((ms: number) => {
    setCurrentDuration(ms);
    setCurrentTargetDate(null);
    setStartTime(null);
  }, []);

  // Format time string
  const getFormattedTime = useCallback((format = 'HH:MM:SS'): string => {
    const padZero = (num: number): string => num.toString().padStart(2, '0');
    
    switch (format) {
      case 'DD:HH:MM:SS':
        return `${padZero(timeLeft.days)}:${padZero(timeLeft.hours)}:${padZero(timeLeft.minutes)}:${padZero(timeLeft.seconds)}`;
      case 'HH:MM:SS':
        const totalHours = timeLeft.days * 24 + timeLeft.hours;
        return `${padZero(totalHours)}:${padZero(timeLeft.minutes)}:${padZero(timeLeft.seconds)}`;
      case 'MM:SS':
        const totalMinutes = timeLeft.hours * 60 + timeLeft.minutes;
        return `${padZero(totalMinutes)}:${padZero(timeLeft.seconds)}`;
      case 'SS':
        return padZero(timeLeft.seconds);
      case 'human':
        if (timeLeft.days > 0) {
          return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`;
        } else if (timeLeft.hours > 0) {
          return `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
        } else if (timeLeft.minutes > 0) {
          return `${timeLeft.minutes}m ${timeLeft.seconds}s`;
        } else {
          return `${timeLeft.seconds}s`;
        }
      default:
        return `${padZero(timeLeft.hours)}:${padZero(timeLeft.minutes)}:${padZero(timeLeft.seconds)}`;
    }
  }, [timeLeft]);

  // Manage interval
  useEffect(() => {
    if (isActive && !isCompleted) {
      intervalRef.current = setInterval(() => {
        // Force re-render by updating a state value
        setStartTime(prev => prev);
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, isCompleted, interval]);

  // Auto-start effect
  useEffect(() => {
    if (autoStart && (currentTargetDate || currentDuration)) {
      start();
    }
  }, [autoStart, currentTargetDate, currentDuration, start]);

  return {
    timeLeft,
    isActive,
    isCompleted,
    start,
    pause,
    resume,
    reset,
    setTarget,
    setDuration,
    getFormattedTime,
  };
}

/**
 * Predefined countdown hooks for common use cases
 */

// Game round countdown
export function useGameCountdown(durationInSeconds: number, onComplete?: () => void) {
  return useCountdown({
    duration: durationInSeconds * 1000,
    onComplete,
    autoStart: false,
  });
}

// Pool countdown (for Fuel mode)
export function usePoolCountdown(endTime: Date, onComplete?: () => void) {
  return useCountdown({
    targetDate: endTime,
    onComplete,
    autoStart: true,
  });
}

// Daily reward countdown
export function useDailyRewardCountdown() {
  const getNextMidnight = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  const [targetDate, setTargetDate] = useState(getNextMidnight());

  const countdown = useCountdown({
    targetDate,
    onComplete: () => {
      // Reset to next midnight when completed
      setTargetDate(getNextMidnight());
    },
    autoStart: true,
  });

  return countdown;
}

// Blitz session countdown
export function useBlitzCountdown(sessionDurationMinutes: number = 30) {
  return useCountdown({
    duration: sessionDurationMinutes * 60 * 1000,
    autoStart: false,
  });
}