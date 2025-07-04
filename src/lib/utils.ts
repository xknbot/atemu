/**
 * Utility functions for the Atemu application
 */

import { type ClassValue, clsx } from "clsx";

/**
 * Utility for merging CSS classes with conditional logic
 * Combines clsx functionality for dynamic class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a wallet address for display
 * @param address - The full wallet address
 * @param startChars - Number of characters to show at start (default: 6)
 * @param endChars - Number of characters to show at end (default: 4)
 */
export function formatAddress(
  address: string, 
  startChars: number = 6, 
  endChars: number = 4
): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format a number for display with appropriate suffixes
 * @param num - The number to format
 * @param decimals - Number of decimal places (default: 2)
 */
export function formatNumber(num: number, decimals: number = 2): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(decimals) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(decimals) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(decimals) + 'K';
  }
  return num.toFixed(decimals);
}

/**
 * Format currency for display
 * @param amount - The amount to format
 * @param currency - The currency symbol (default: 'STRK')
 * @param decimals - Number of decimal places (default: 4)
 */
export function formatCurrency(
  amount: number | string, 
  currency: string = 'STRK', 
  decimals: number = 4
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${num.toFixed(decimals)} ${currency}`;
}

/**
 * Convert Wei to Ether equivalent
 * @param wei - Wei amount as string or number
 * @param decimals - Token decimals (default: 18)
 */
export function fromWei(wei: string | number, decimals: number = 18): number {
  const weiString = typeof wei === 'number' ? wei.toString() : wei;
  const divisor = Math.pow(10, decimals);
  return parseInt(weiString) / divisor;
}

/**
 * Convert Ether to Wei equivalent
 * @param ether - Ether amount as string or number
 * @param decimals - Token decimals (default: 18)
 */
export function toWei(ether: string | number, decimals: number = 18): string {
  const etherNumber = typeof ether === 'string' ? parseFloat(ether) : ether;
  const multiplier = Math.pow(10, decimals);
  return Math.floor(etherNumber * multiplier).toString();
}

/**
 * Sleep utility for async operations
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function for performance optimization
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance optimization
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate a random string of specified length
 * @param length - Length of the string (default: 8)
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Check if a string is a valid URL
 * @param string - String to validate
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

/**
 * Get storage item with fallback
 * @param key - Storage key
 * @param fallback - Fallback value
 * @param storage - Storage type ('localStorage' | 'sessionStorage')
 */
export function getStorageItem<T>(
  key: string, 
  fallback: T, 
  storage: 'localStorage' | 'sessionStorage' = 'localStorage'
): T {
  try {
    const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
    const item = storageObj.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Set storage item
 * @param key - Storage key
 * @param value - Value to store
 * @param storage - Storage type ('localStorage' | 'sessionStorage')
 */
export function setStorageItem<T>(
  key: string, 
  value: T, 
  storage: 'localStorage' | 'sessionStorage' = 'localStorage'
): void {
  try {
    const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
    storageObj.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to set storage item:', err);
  }
}