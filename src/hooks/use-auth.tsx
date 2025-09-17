'use client';

import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// This is a mock user type. In a real app, this would be more detailed.
type User = {
  name: string;
  email: string;
};

// This is a mock API call. In a real app, you would fetch from your backend.
const fakeApiLogin = async (data: any): Promise<User> => {
  console.log('Logging in with:', data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (data.email.includes('fail')) {
    throw new Error('Invalid credentials');
  }
  return { name: 'Test User', email: data.email };
};

const fakeApiRegister = async (data: any): Promise<User> => {
    console.log('Registering with:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.email.includes('fail')) {
      throw new Error('Registration failed');
    }
    return { name: data.name, email: data.email };
  };

type AuthContextType = {
  user: User | null;
  login: (data: any) => void;
  logout: () => void;
  register: (data: any) => void;
  loginMutation: ReturnType<typeof useMutation>;
  registerMutation: ReturnType<typeof useMutation>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from a previous session
    const storedUser = localStorage.getItem('agrivision_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginMutation = useMutation<User, Error, any>({
    mutationFn: fakeApiLogin,
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('agrivision_user', JSON.stringify(data));
      toast({ title: 'Success', description: 'Logged in successfully!' });
    },
    onError: (error) => {
      toast({
        title: 'Login Failed',
        description: error.message || 'An error occurred.',
        variant: 'destructive',
      });
    },
  });

  const registerMutation = useMutation<User, Error, any>({
    mutationFn: fakeApiRegister,
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('agrivision_user', JSON.stringify(data));
      toast({ title: 'Success', description: 'Account created successfully!' });
    },
    onError: (error) => {
      toast({
        title: 'Registration Failed',
        description: error.message || 'An error occurred.',
        variant: 'destructive',
      });
    },
  });

  const login = (data: any) => {
    loginMutation.mutate(data);
  };

  const register = (data: any) => {
    registerMutation.mutate(data);
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('agrivision_user');
    toast({ title: 'Logged Out', description: 'You have been logged out.' });
  }, [toast]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loginMutation, registerMutation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
