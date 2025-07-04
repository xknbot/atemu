/**
 * Form validation utilities and schemas
 */

import { REGEX_PATTERNS } from './constants';

// Validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Email validation
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email.trim()) {
    errors.push('Email is required');
  } else if (!REGEX_PATTERNS.EMAIL.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Username validation
export function validateUsername(username: string): ValidationResult {
  const errors: string[] = [];
  
  if (!username.trim()) {
    errors.push('Username is required');
  } else if (username.length < 3) {
    errors.push('Username must be at least 3 characters');
  } else if (username.length > 20) {
    errors.push('Username must be less than 20 characters');
  } else if (!REGEX_PATTERNS.USERNAME.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Wallet address validation
export function validateWalletAddress(address: string): ValidationResult {
  const errors: string[] = [];
  
  if (!address.trim()) {
    errors.push('Wallet address is required');
  } else if (!REGEX_PATTERNS.WALLET_ADDRESS.test(address)) {
    errors.push('Please enter a valid Starknet wallet address');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Password validation
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Confirm password validation
export function validateConfirmPassword(
  password: string, 
  confirmPassword: string
): ValidationResult {
  const errors: string[] = [];
  
  if (!confirmPassword) {
    errors.push('Please confirm your password');
  } else if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Amount validation (for transactions)
export function validateAmount(
  amount: string, 
  balance?: number, 
  min?: number, 
  max?: number
): ValidationResult {
  const errors: string[] = [];
  
  if (!amount.trim()) {
    errors.push('Amount is required');
    return { isValid: false, errors };
  }
  
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    errors.push('Please enter a valid number');
    return { isValid: false, errors };
  }
  
  if (numAmount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  if (min !== undefined && numAmount < min) {
    errors.push(`Amount must be at least ${min}`);
  }
  
  if (max !== undefined && numAmount > max) {
    errors.push(`Amount cannot exceed ${max}`);
  }
  
  if (balance !== undefined && numAmount > balance) {
    errors.push('Insufficient balance');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Deck name validation
export function validateDeckName(name: string): ValidationResult {
  const errors: string[] = [];
  
  if (!name.trim()) {
    errors.push('Deck name is required');
  } else if (name.length < 3) {
    errors.push('Deck name must be at least 3 characters');
  } else if (name.length > 50) {
    errors.push('Deck name must be less than 50 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Card deck validation
export function validateDeck(cardIds: string[]): ValidationResult {
  const errors: string[] = [];
  
  if (cardIds.length < 20) {
    errors.push('Deck must contain at least 20 cards');
  } else if (cardIds.length > 30) {
    errors.push('Deck cannot contain more than 30 cards');
  }
  
  // Check for duplicate cards (max 3 of each)
  const cardCounts = new Map<string, number>();
  cardIds.forEach(cardId => {
    cardCounts.set(cardId, (cardCounts.get(cardId) || 0) + 1);
  });
  
  for (const [cardId, count] of cardCounts) {
    if (count > 3) {
      errors.push(`Cannot have more than 3 copies of the same card`);
      break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Generic form validation
export function validateForm<T extends Record<string, any>>(
  data: T,
  validators: Partial<Record<keyof T, (value: any) => ValidationResult>>
): { isValid: boolean; errors: Partial<Record<keyof T, string[]>> } {
  const errors: Partial<Record<keyof T, string[]>> = {};
  let isValid = true;
  
  for (const [field, validator] of Object.entries(validators)) {
    if (validator && typeof validator === 'function') {
      const result = validator(data[field as keyof T]);
      if (!result.isValid) {
        errors[field as keyof T] = result.errors;
        isValid = false;
      }
    }
  }
  
  return { isValid, errors };
}

// Contact form validation
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: string[] = [];
  
  // Name validation
  if (!data.name.trim()) {
    errors.push('Name is required');
  } else if (data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  // Email validation
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }
  
  // Subject validation
  if (!data.subject.trim()) {
    errors.push('Subject is required');
  } else if (data.subject.length < 5) {
    errors.push('Subject must be at least 5 characters');
  }
  
  // Message validation
  if (!data.message.trim()) {
    errors.push('Message is required');
  } else if (data.message.length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Login form validation
export interface LoginFormData {
  email: string;
  password: string;
}

export function validateLoginForm(data: LoginFormData): ValidationResult {
  const errors: string[] = [];
  
  // Email validation
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }
  
  // Password validation (just check if provided)
  if (!data.password) {
    errors.push('Password is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Registration form validation
export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export function validateRegisterForm(data: RegisterFormData): ValidationResult {
  const errors: string[] = [];
  
  // Username validation
  const usernameValidation = validateUsername(data.username);
  if (!usernameValidation.isValid) {
    errors.push(...usernameValidation.errors);
  }
  
  // Email validation
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }
  
  // Password validation
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors);
  }
  
  // Confirm password validation
  const confirmPasswordValidation = validateConfirmPassword(
    data.password, 
    data.confirmPassword
  );
  if (!confirmPasswordValidation.isValid) {
    errors.push(...confirmPasswordValidation.errors);
  }
  
  // Terms agreement validation
  if (!data.agreeToTerms) {
    errors.push('You must agree to the terms and conditions');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}