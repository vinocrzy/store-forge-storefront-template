'use client';

/**
 * AuthContext — Global customer authentication state
 * Wraps customer.ts service and exposes reactive auth state
 * Token storage: localStorage.customer_token (managed by customer.ts)
 */

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as CustomerService from '@/services/customer';
import type { RegisterRequest, LoginRequest } from '@/services/customer';
import type { Customer } from '@/types';

interface AuthState {
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    customer: null,
    isAuthenticated: false,
    isLoading: true,
  });

  /**
   * On mount: if a token exists in localStorage, fetch the profile
   * to rehydrate authenticated state without prompting a fresh login.
   */
  useEffect(() => {
    const token = CustomerService.getAuthToken();
    if (!token) {
      setState({ customer: null, isAuthenticated: false, isLoading: false });
      return;
    }

    CustomerService.getProfile()
      .then((customer) => {
        setState({ customer, isAuthenticated: true, isLoading: false });
      })
      .catch(() => {
        // Token invalid / expired — clear it
        if (typeof window !== 'undefined') {
          localStorage.removeItem('customer_token');
        }
        setState({ customer: null, isAuthenticated: false, isLoading: false });
      });
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    const result = await CustomerService.login(data);
    setState({ customer: result.customer, isAuthenticated: true, isLoading: false });
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const result = await CustomerService.register(data);
    setState({ customer: result.customer, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    try {
      await CustomerService.logout();
    } catch {
      // Always clear local state even if server call fails
    }
    setState({ customer: null, isAuthenticated: false, isLoading: false });
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const customer = await CustomerService.getProfile();
      setState((prev) => ({ ...prev, customer }));
    } catch {
      // Silently fail — profile refresh is non-critical
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth — Hook to access auth context
 * Must be used inside AuthProvider
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
